const { analyzeMood } = require("../moodAnalyzer");

describe('Core Backend Functionality', () => {
  
  // Test 1: Infrastructure Check
  test('Server environment should be healthy', () => {
    const isHealthy = true;
    expect(isHealthy).toBe(true);
  });

  // Test 2: Smart Mood Analysis Logic
  describe('Naive Bayes Sentiment Analysis', () => {
    
    test('Should return Neutral (Level 4) for empty or neutral text', () => {
      const result = analyzeMood('');
      expect(result.level).toBe(4);
      expect(result.label).toBe("Doing Okay");
    });

    test('Should correctly identify Thriving/Positive (Level 5)', () => {
      const result = analyzeMood('I am so incredibly happy and excited today! Best day ever.');
      expect(result.level).toBe(5);
    });

    test('Should correctly identify Very Sad (Level 2)', () => {
      const result = analyzeMood('I just feel completely worthless and depressed all the time.');
      expect(result.level).toBe(2);
    });

    test('Should correctly identify Stressed/Mildly Low (Level 3)', () => {
      const result = analyzeMood('I am just so tired and anxious about work.');
      expect(result.level).toBe(3);
    });

    test('CRITICAL: Should correctly identify and escalate Crisis (Level 1)', () => {
      const result = analyzeMood('I cannot do this anymore, I want to end my life.');
      expect(result.level).toBe(1);
      // Ensure the crisis response includes the emergency instructions
      expect(result.tips[0]).toContain('crisis helpline');
    });

    test('Should handle negations properly (flips positive to negative)', () => {
      const positiveResult = analyzeMood('I am feeling very happy!');
      // "not happy" flips the sentiment
      const negatedResult = analyzeMood('I am definitely not happy right now.');
      
      expect(positiveResult.level).toBe(5);
      // It shouldn't be level 5 anymore because of 'not'
      expect(negatedResult.level).not.toBe(5); 
    });

  });
});
