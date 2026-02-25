import { AnalyzerService } from './analyzer.service';

describe('AnalyzerService', () => {
  let analyzer: AnalyzerService;

  beforeEach(() => {
    analyzer = new AnalyzerService();
  });

  // 1️⃣ Billing classification
  it('should classify Billing correctly', () => {
    const result = analyzer.analyze('I want a refund for incorrect payment');

    expect(result.category).toBe('Billing');
  });

  // 2️⃣ Technical classification
  it('should classify Technical correctly', () => {
    const result = analyzer.analyze('The app has a crash error');

    expect(result.category).toBe('Technical');
  });

  // 3️⃣ Priority P0 detection
  it('should assign P0 for down keyword', () => {
    const result = analyzer.analyze('The server is down');

    expect(result.priority).toBe('P0');
  });

  // 4️⃣ Priority P1 detection
  it('should assign P1 for urgent keyword', () => {
    const result = analyzer.analyze('Please fix this urgent issue');

    expect(result.priority).toBe('P1');
  });

  // 5️⃣ Default P3
  it('should assign P3 if no priority rules matched', () => {
    const result = analyzer.analyze('Just giving some feedback about UI');

    expect(result.priority).toBe('P3');
  });

  // 6️⃣ Custom security rule
  it('should override to Technical and P0 for security keyword', () => {
    const result = analyzer.analyze('There is a security vulnerability');

    expect(result.category).toBe('Technical');
    expect(result.priority).toBe('P0');
  });
});
