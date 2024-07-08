// src/fuzzySearch.js
import { qaData } from './data';

export const findAnswer = (query) => {
    const lowerQuery = query.toLowerCase();
    for (const qa of qaData) {
        if (qa.question.toLowerCase().includes(lowerQuery)) {
            return qa.answer;
        }
    }
    return "Sorry, we don't have an answer to your question. Please ask something else.";
};
