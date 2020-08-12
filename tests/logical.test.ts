import { Expression } from '../src/expression';

interface PseudoModel {
  name: string;
  matricule: string;
  isFool: boolean;
}

describe('logical expression passes', () => {
  it('should have lefthandside and next', () => {
    // Arrange
    const exp = new Expression<PseudoModel>((n) => n.name && n.isFool);

    // Act
    exp.compile();

    // Assert
    expect(exp.leftHandSide).toBeDefined();
    expect(exp.next).toBeDefined();
  });

  it('should be binded by &&', () => {
    // Arrange
    const exp = new Expression<PseudoModel>((n) => n.name && n.isFool);

    // Act
    exp.compile();

    // Assert
    expect(exp.next.bindedBy).toBe('&&');
  });

  it('should be binded by ||', () => {
    // Arrange
    const exp = new Expression<PseudoModel>((n) => n.name || n.isFool);

    // Act
    exp.compile();

    // Assert
    expect(exp.next.bindedBy).toBe('||');
  });

  it('should be binded by && at first level then by || at next level', () => {
    // Arrange
    const exp = new Expression<PseudoModel>(
      (n) => (n.name && n.matricule) || n.isFool
    );

    // Act
    exp.compile();

    // Assert
    expect(exp.next.bindedBy).toBe('&&');
    expect(exp.next.followedBy.next).toBeDefined();
    expect(exp.next.followedBy.next.bindedBy).toBe('||');
    expect(exp.next.followedBy.next.followedBy).toBeDefined();
  });
});