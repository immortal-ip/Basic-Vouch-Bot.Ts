export interface Command {
    name: string;
    description: string;
    execute: (args: string[]) => Promise<void>;
}

export interface Ticket {
    id: string;
    userId: string;
    createdAt: Date;
    status: 'open' | 'closed';
}

export interface Vouch {
    userId: string;
    vouchFor: string;
    createdAt: Date;
}