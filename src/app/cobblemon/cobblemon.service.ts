import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, catchError, shareReplay } from 'rxjs';

// === INTERFACES ===

export interface CobblemonPlayer {
    username: string;
    uuid: string;
}

export interface DexEntry {
    id: number;
    key: string;
    name: string;
}

export type PokemonStatus = 'captured-shiny' | 'captured' | 'seen' | 'unseen';

export interface PokemonCell {
    dexId: number;
    name: string;
    key: string;
    status: PokemonStatus;
    spriteUrl: string;
    isLegendary: boolean;
    isAlpha: boolean;
}

export interface CobblemonPlayerData {
    uuid: string;
    advancementData: {
        totalCaptureCount: number;
        totalEggsCollected: number;
        totalEggsHatched: number;
        totalEvolvedCount: number;
        totalBattleVictoryCount: number;
        totalPvPBattleVictoryCount: number;
        totalPvWBattleVictoryCount: number;
        totalPvNBattleVictoryCount: number;
        totalShinyCaptureCount: number;
        totalTradedCount: number;
        totalTypeCaptureCounts: Record<string, number>;
        totalDefeatedCounts: Record<string, number>;
        aspectsCollected: Record<string, string[]>;
    };
}

export interface PlayerPokedex {
    player: CobblemonPlayer;
    data: CobblemonPlayerData;
    grid: PokemonCell[];
    stats: {
        captured: number;
        seen: number;
        shiny: number;
        legendaries: number;
        alpha: number;
        total: number;
        evolved: number;
        traded: number;
        eggsHatched: number;
        battlesWon: number;
    };
}

// Légendaires + Fabuleux (Gen 1–9)
const LEGENDARY_IDS = new Set([
    144, 145, 146, 150, 151,
    243, 244, 245, 249, 250, 251,
    377, 378, 379, 380, 381, 382, 383, 384, 385, 386,
    480, 481, 482, 483, 484, 485, 486, 487, 488, 489, 490, 491, 492, 493,
    494, 638, 639, 640, 641, 642, 643, 644, 645, 646, 647, 648, 649,
    716, 717, 718, 719, 720, 721,
    772, 773, 785, 786, 787, 788, 789, 790, 791, 792, 800, 801, 802, 807, 808, 809,
    888, 889, 890, 891, 892, 893, 894, 895, 896, 897, 898,
    1001, 1002, 1003, 1004, 1007, 1008, 1009, 1010, 1014, 1015, 1016, 1017, 1021, 1022, 1023, 1024, 1025
]);

@Injectable({
    providedIn: 'root'
})
export class CobblemonService {
    private http = inject(HttpClient);
    private playersCache$: Observable<CobblemonPlayer[]> | null = null;
    private dexCache$: Observable<DexEntry[]> | null = null;

    getPlayers(): Observable<CobblemonPlayer[]> {
        if (!this.playersCache$) {
            this.playersCache$ = this.http.get<CobblemonPlayer[]>('assets/cobblemon/players.json').pipe(
                catchError(() => of([])),
                shareReplay(1)
            );
        }
        return this.playersCache$;
    }

    getDex(): Observable<DexEntry[]> {
        if (!this.dexCache$) {
            this.dexCache$ = this.http.get<DexEntry[]>('assets/cobblemon/national_dex.json').pipe(
                catchError(() => of([])),
                shareReplay(1)
            );
        }
        return this.dexCache$;
    }

    getPlayerData(player: CobblemonPlayer): Observable<CobblemonPlayerData | null> {
        return this.http.get<CobblemonPlayerData>(`assets/cobblemon/data/${player.uuid}.json`).pipe(
            catchError(() => of(null))
        );
    }

    // === CONSTRUCTION DU POKÉDEX ===

    buildPokedex(player: CobblemonPlayer, data: CobblemonPlayerData, dex: DexEntry[]): PlayerPokedex {
        const aspects = data.advancementData.aspectsCollected || {};
        const defeated = data.advancementData.totalDefeatedCounts || {};

        const capturedKeys = new Map<string, { isShiny: boolean; isAlpha: boolean }>();
        for (const [raw, aspectList] of Object.entries(aspects)) {
            const key = raw.replace('cobblemon:', '').replace(/-/g, '');
            capturedKeys.set(key, {
                isShiny: aspectList.includes('shiny'),
                isAlpha: aspectList.includes('alpha')
            });
        }

        const seenKeys = new Set<string>();
        for (const raw of Object.keys(defeated)) {
            seenKeys.add(raw.replace('cobblemon:', '').replace(/-/g, ''));
        }

        const grid: PokemonCell[] = dex.map(entry => {
            let status: PokemonStatus = 'unseen';
            let isShiny = false;
            let isAlpha = false;
            const isLegendary = LEGENDARY_IDS.has(entry.id);

            const info = capturedKeys.get(entry.key);
            if (info) {
                isShiny = info.isShiny;
                isAlpha = info.isAlpha;
                status = isShiny ? 'captured-shiny' : 'captured';
            } else if (seenKeys.has(entry.key)) {
                status = 'seen';
            }

            return {
                dexId: entry.id,
                name: entry.name,
                key: entry.key,
                status,
                spriteUrl: this.getSpriteUrl(entry.id, isShiny),
                isLegendary,
                isAlpha
            };
        });

        const adv = data.advancementData;

        return {
            player,
            data,
            grid,
            stats: {
                captured: grid.filter(p => p.status === 'captured' || p.status === 'captured-shiny').length,
                seen: grid.filter(p => p.status !== 'unseen').length,
                shiny: grid.filter(p => p.status === 'captured-shiny').length,
                legendaries: grid.filter(p => p.isLegendary && (p.status === 'captured' || p.status === 'captured-shiny')).length,
                alpha: grid.filter(p => p.isAlpha).length,
                total: dex.length,
                evolved: adv.totalEvolvedCount || 0,
                traded: adv.totalTradedCount || 0,
                eggsHatched: adv.totalEggsHatched || 0,
                battlesWon: adv.totalBattleVictoryCount || 0
            }
        };
    }

    // === URLS ===

    getSpriteUrl(dexId: number, shiny = false): string {
        const path = shiny ? `pokemon/shiny/${dexId}` : `pokemon/${dexId}`;
        return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/${path}.png`;
    }

    getPlayerAvatarUrl(username: string, size = 64): string {
        return `https://visage.surgeplay.com/face/${size}/${username}`;
    }

    getPlayerBodyUrl(username: string, size = 128): string {
        return `https://visage.surgeplay.com/full/${size}/${username}`;
    }
}