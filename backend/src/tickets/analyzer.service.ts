import { Injectable } from '@nestjs/common';
import {
  CATEGORY_KEYWORDS,
  URGENCY_KEYWORDS,
  PRIORITY_RULES,
} from './config/keyword-rules';

@Injectable()
export class AnalyzerService {
  analyze(message: string) {
    const text = message.toLowerCase();

    let matchedKeywords: string[] = [];
    let urgencySignals: string[] = [];

    // -------- 1️⃣ Custom Rule (Security Override) --------
    if (text.includes('security')) {
      return {
        category: 'Technical',
        priority: 'P0',
        urgencySignals: ['security'],
        keywords: ['security'],
        confidence: 1,
      };
    }

    // -------- 2️⃣ Category Detection --------
    let selectedCategory = 'Other';
    let highestMatchCount = 0;

    for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
      let matchCount = 0;

      for (const keyword of keywords) {
        if (text.includes(keyword)) {
          matchCount++;
          matchedKeywords.push(keyword);
        }
      }

      if (matchCount > highestMatchCount) {
        highestMatchCount = matchCount;
        selectedCategory = category;
      }
    }

    // -------- 3️⃣ Urgency Detection --------
    for (const keyword of URGENCY_KEYWORDS) {
      if (text.includes(keyword)) {
        urgencySignals.push(keyword);
        if (!matchedKeywords.includes(keyword)) {
          matchedKeywords.push(keyword);
        }
      }
    }

    // -------- 4️⃣ Priority Assignment --------
    let priority = 'P3';

    for (const keyword of PRIORITY_RULES.P0) {
      if (text.includes(keyword)) {
        priority = 'P0';
      }
    }

    if (priority !== 'P0') {
      for (const keyword of PRIORITY_RULES.P1) {
        if (text.includes(keyword)) {
          priority = 'P1';
        }
      }
    }

    if (priority === 'P3' && urgencySignals.length > 0) {
      priority = 'P2';
    }

    // -------- 5️⃣ Confidence Calculation --------
    const totalKeywordsChecked =
      Object.values(CATEGORY_KEYWORDS).flat().length + URGENCY_KEYWORDS.length;

    const confidence =
      totalKeywordsChecked === 0
        ? 0
        : Number((matchedKeywords.length / totalKeywordsChecked).toFixed(2));

    return {
      category: selectedCategory,
      priority,
      urgencySignals,
      keywords: matchedKeywords,
      confidence,
    };
  }
}
