import { generateText, embed } from 'ai';
import { google } from '@ai-sdk/google';

interface BookmarkContent {
    title: string;
    description?: string;
    content?: string;
    url: string;
}

interface AiTagSuggestion {
    tag: string;
    confidence: number;  // 0-100
    reasoning: string;
}

export async function suggestTags(
    bookmark: BookmarkContent,
    userExistingTags: string[]
): Promise<AiTagSuggestion[]> {
    const model = google('gemini-2.0-flash-exp'); // Using flash-exp as pro might not be available or named differently in SDK yet. Or 'gemini-1.5-pro-latest'

    const prompt = `You are an expert bookmark tagger. Analyze the following bookmark and suggest 3-5 relevant tags.

BOOKMARK DETAILS:
Title: ${bookmark.title}
URL: ${bookmark.url}
Description: ${bookmark.description || 'N/A'}
Content Preview: ${bookmark.content?.substring(0, 300) || 'N/A'}

USER'S EXISTING TAGS: ${userExistingTags.join(', ')}

IMPORTANT INSTRUCTIONS:
1. Prefer tags from the user's existing tags list (shows personalization)
2. If suggesting new tags, make them specific and useful
3. Assign confidence scores (0-100) based on certainty
4. For each tag, briefly explain why it's relevant
5. Output ONLY valid JSON, no markdown

RESPONSE FORMAT:
{
  "tags": [
    {
      "tag": "tag_name",
      "confidence": 95,
      "reasoning": "Explains why this tag applies"
    }
  ]
}`;

    try {
        const { text } = await generateText({
            model,
            prompt,
            temperature: 0.3,
        });

        // Parse JSON response
        // Remove markdown code blocks if present
        const cleanText = text.replace(/```json\n|\n```/g, '').trim();
        const parsed = JSON.parse(cleanText);
        return parsed.tags;
    } catch (error) {
        console.error('AI tagging error:', error);
        // Fallback: extract keywords from title
        return getKeywordTags(bookmark.title);
    }
}

// Fallback: Extract basic keywords
function getKeywordTags(title: string): AiTagSuggestion[] {
    const keywords = title
        .split(/[- :,]/)
        .filter(w => w.length > 3)
        .slice(0, 3);

    return keywords.map(tag => ({
        tag: tag.toLowerCase().trim(),
        confidence: 60,
        reasoning: 'Extracted from title'
    }));
}

export async function generateSummary(bookmark: BookmarkContent): Promise<string> {
    const model = google('gemini-2.0-flash-exp');

    const prompt = `You are an expert content summarizer. Create a concise, engaging summary (TL;DR) for the following bookmark.

BOOKMARK DETAILS:
Title: ${bookmark.title}
URL: ${bookmark.url}
Description: ${bookmark.description || 'N/A'}
Content Preview: ${bookmark.content?.substring(0, 500) || 'N/A'}

INSTRUCTIONS:
1. Keep it under 3 sentences.
2. Focus on the main value proposition or key takeaway.
3. Be objective but engaging.
4. Output ONLY the summary text.`;

    try {
        const { text } = await generateText({
            model,
            prompt,
            temperature: 0.3,
        });
        return text.trim();
    } catch (error) {
        console.error('AI summary error:', error);
        return bookmark.description || 'No summary available.';
    }
}

export async function generateEmbedding(text: string): Promise<number[]> {
    const model = google.textEmbeddingModel('text-embedding-004');

    try {
        const { embedding } = await embed({
            model,
            value: text,
        });
        return embedding;
    } catch (error) {
        console.error('Embedding error:', error);
        return [];
    }
}
