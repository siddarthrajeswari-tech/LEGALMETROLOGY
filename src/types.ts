export type NavigationPath =
  | 'dashboard'
  | 'field-inspections'
  | 'product-verification'
  | 'inspection-review'
  | 'regional-monitoring'
  | 'state-overview'
  | 'case-management'
  | 'reports-audit-trail'
  | 'notifications'
  | 'security-profile'
  | 'login';

export interface OfficerProfile {
  id: string;
  name: string;
  role: string;
  jurisdiction: string;
  badge: string;
  scope: string;
  avatarUrl?: string;
  tier: string;
}

export interface FieldInspectionTask {
  id: string;
  code: string;
  establishment: string;
  category: string;
  address: string;
  targetCommodity: string;
  priority: 'HIGH' | 'CRITICAL' | 'NORMAL';
  status: 'Pending' | 'In Progress' | 'Violation' | 'Submitted';
  slot: string;
  assignedInspector: string;
}

export interface EvidentiaryAngle {
  title: string;
  sub: string;
  img: string;
  hash: string;
  caliperHeight: string;
  hasViolation?: boolean;
}

export interface SupervisoryCase {
  id: string;
  code: string;
  establishment: string;
  branchCode: string;
  premise: string;
  inspectorName: string;
  inspectorSector: string;
  tag: string;
  tagType: 'critical' | 'defect' | 'query' | 'pending';
  priority: 'Critical' | 'Net Qty Deficit' | 'Query Active' | 'Verification Pending';
  commoditySummary: string;
  rulesCited: string[];
  timeLeft?: string;
  submittedTime: string;
  status: 'Unprocessed' | 'Approved' | 'Escalated' | 'Clarification' | 'Rectification';
  dispatchId: string;
  gpsCoords: string;
  barcode: string;
  batchNo: string;
  packagedDate: string;
  seizedUnits: number;
  charge1Confirmed: boolean;
  charge2Confirmed: boolean;
  compoundingAmount: number;
  priorOffences: string;
}

export interface DistrictMetric {
  name: string;
  zone: string;
  inspections: number;
  violations: number;
  violationRate: string;
  compounding: string;
  backlog: 'Low' | 'Normal' | 'Action Req';
  rating: 'Class A' | 'Class B' | 'Class C';
}

export interface RepeatOffender {
  id: string;
  name: string;
  subtitle: string;
  violationsCount: number;
  districtsCount: number;
  districts: string[];
  section: string;
  statusOrAmount: string;
}

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type: 'info' | 'success' | 'warning' | 'error';
}
