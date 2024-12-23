type Heir = {
  relationship: string;
  gender: 'male' | 'female';
  count: number;
};

type FinancialDetails = {
  totalEstate: number;
  funeralExpenses: number;
  debts: number;
  wasiyyah: number;
};

type Share = {
  heir: Heir;
  share: number;
  amount: number;
  explanation: string;
};

// Islamic inheritance shares according to Shariah law
const FIXED_SHARES = {
  husband: { withChildren: 1/4, withoutChildren: 1/2 },
  wife: { withChildren: 1/8, withoutChildren: 1/4 },
  father: { withSon: 1/6, withoutSon: 'residual' },
  mother: { withChildren: 1/6, withoutChildren: 1/3 },
  daughter: { withSon: 1/2, multiple: 2/3 },
  son: 'residual',
} as const;

function hasChildren(heirs: Heir[]): boolean {
  return heirs.some(heir => heir.relationship === 'son' || heir.relationship === 'daughter');
}

function hasSon(heirs: Heir[]): boolean {
  return heirs.some(heir => heir.relationship === 'son');
}

function calculateNetEstate(financialDetails: FinancialDetails): number {
  const { totalEstate, funeralExpenses, debts, wasiyyah } = financialDetails;
  const maxWasiyyah = totalEstate * 0.333; // Maximum 1/3 for wasiyyah
  const actualWasiyyah = Math.min(wasiyyah, maxWasiyyah);
  
  return Math.max(0, totalEstate - funeralExpenses - debts - actualWasiyyah);
}

export function calculateInheritance(heirs: Heir[], financialDetails: FinancialDetails) {
  const netEstate = calculateNetEstate(financialDetails);
  const hasChildrenFlag = hasChildren(heirs);
  const hasSonFlag = hasSon(heirs);
  const shares: Share[] = [];
  let remainingShare = 1;

  // Calculate fixed shares first
  heirs.forEach(heir => {
    let share = 0;
    let explanation = '';

    switch (heir.relationship) {
      case 'husband':
        share = hasChildrenFlag ? FIXED_SHARES.husband.withChildren : FIXED_SHARES.husband.withoutChildren;
        explanation = hasChildrenFlag ? 
          'husband_share_with_children' : 
          'husband_share_without_children';
        break;

      case 'wife':
        share = hasChildrenFlag ? FIXED_SHARES.wife.withChildren : FIXED_SHARES.wife.withoutChildren;
        share = share / heir.count; // Divide among multiple wives
        explanation = hasChildrenFlag ? 
          'wife_share_with_children' : 
          'wife_share_without_children';
        break;

      case 'father':
        if (hasSonFlag) {
          share = FIXED_SHARES.father.withSon;
          explanation = 'father_share_with_son';
        }
        break;

      case 'mother':
        share = hasChildrenFlag ? FIXED_SHARES.mother.withChildren : FIXED_SHARES.mother.withoutChildren;
        explanation = hasChildrenFlag ? 
          'mother_share_with_children' : 
          'mother_share_without_children';
        break;
    }

    if (share > 0) {
      remainingShare -= share;
      shares.push({
        heir,
        share,
        amount: netEstate * share,
        explanation
      });
    }
  });

  // Distribute remaining estate among residual heirs
  const residualHeirs = heirs.filter(heir => 
    heir.relationship === 'son' || 
    (heir.relationship === 'father' && !hasSonFlag)
  );

  if (residualHeirs.length > 0) {
    const maleShare = remainingShare / residualHeirs.length;
    residualHeirs.forEach(heir => {
      shares.push({
        heir,
        share: maleShare,
        amount: netEstate * maleShare,
        explanation: 'residual_share'
      });
    });
  }

  return {
    netEstate,
    shares,
    remainingShare: remainingShare > 0 ? netEstate * remainingShare : 0
  };
}