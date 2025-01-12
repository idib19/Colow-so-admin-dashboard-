// Common Types
export interface PersonInfo {
    firstname: string;
    lastname: string;
    idCardNumber: string;
    city: string;
    province?: string;
    phoneNumber: string;
    email: string;
    reason: string;
  }
  
  // Authentication DTOs
  export interface BaseRegistrationDTO {
    password: string;
    email: string;
    name: string;
    entityId: string;
  }
  
  export interface MasterUserRegistrationDTO extends BaseRegistrationDTO {
    role: 'master';
    entityId: string;
  }
  
  export interface PartnerUserRegistrationDTO extends BaseRegistrationDTO {
    role: 'partner';
    entityId: string;
    masterId: string;
  }
  
  export type RegistrationDTO = MasterUserRegistrationDTO | PartnerUserRegistrationDTO;
  
  // Master DTOs
  export interface CreateMasterDTO {
    country: string;
    assignedUserId?: string;
  }
  
  export interface MasterResponseDTO {
    id: string;
    country: string;
    balance: number;
    assignedUserId?: string;
    partnersList: string[];
    totalCommission: number;
    createdAt: Date;
    updatedAt: Date;
  }
  
  // Partner DTOs
  export interface CreatePartnerDTO {
    country: string;
    masterId: string;
    userId: string;
  }
  
  export interface PartnerResponseDTO {
    id: string;
    country: string;
    balance: number;
    masterId: string;
    totalCommission: number;
    createdAt: Date;
    updatedAt: Date;
  }
  
  // Transaction DTOs
  export interface CreateTransactionDTO {
    issuerId: string;
    senderInfo: PersonInfo;
    receiverInfo: PersonInfo;
    amount: number;
    issuerModel: 'Master' | 'Partner';
  }
  
  export interface TransactionResponseDTO {
    id: string;
    issuerId: string;
    issuerModel: 'Master' | 'Partner';
    senderInfo: PersonInfo;
    receiverInfo: PersonInfo;
    status: 'pending' | 'completed' | 'failed';
    amount: number;
    createdAt: Date;
    updatedAt: Date;
  }
  
  // Transfer DTOs
  export interface CreateTransferDTO {
    type: 1 | 2;
    amount: number;
    issuerId: string;
  }
  
  export interface TransferResponseDTO {
    id: string;
    type: 1 | 2;
    amount: number;
    issuerId: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  // Card Load DTOs
  export interface CreateCardLoadDTO {
    issuerId: string;
    cardId: string;
    issuerModel: 'Master' | 'Partner';
    amount: number;
  }
  
  export interface CardLoadResponseDTO {
    id: string;
    issuerId: string;
    issuerModel: 'Master' | 'Partner';
    cardId: string;
    amount: number;
    createdAt: Date;
    updatedAt: Date;
  }
  
  // Claim DTOs
  export interface CreateClaimDTO {
    transactionId: string;
    transactionIssuerId: string;
  }
  
  export interface ClaimResponseDTO {
    id: string;
    transactionId: string;
    status: 'pending' | 'resolved' | 'rejected';
    clientId: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  // ColowSo Admin DTOs
  export interface LoadMasterAccountDTO {
    masterId: string;
    amount: number;
  }
  
  export interface MetricsResponseDTO {
    transactionCount: number;
    totalTransactionAmount: number;
    transferCount: number;
    totalTransferAmount: number;
    cardLoadCount: number;
    totalCardLoadAmount: number;
  }