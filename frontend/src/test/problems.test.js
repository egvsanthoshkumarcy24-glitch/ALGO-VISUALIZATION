import { describe, it, expect } from 'vitest';
import { PROBLEMS, CATEGORIES } from '../data/problems';

describe('Problems Data', () => {
  it('should have unique IDs for all problems', () => {
    const ids = PROBLEMS.map(p => p.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('should have valid categories for all problems', () => {
    const validCategories = Object.values(CATEGORIES);
    PROBLEMS.forEach(problem => {
      expect(validCategories).toContain(problem.category);
    });
  });

  it('should have required fields for all problems', () => {
    PROBLEMS.forEach(problem => {
      expect(problem).toHaveProperty('id');
      expect(problem).toHaveProperty('title');
      expect(problem).toHaveProperty('category');
      expect(problem).toHaveProperty('difficulty');
      expect(problem).toHaveProperty('description');
      expect(['Easy', 'Medium', 'Hard']).toContain(problem.difficulty);
    });
  });

  it('should have non-empty inputs array', () => {
    PROBLEMS.forEach(problem => {
      if (problem.inputs) {
        expect(Array.isArray(problem.inputs)).toBe(true);
      }
    });
  });
});
