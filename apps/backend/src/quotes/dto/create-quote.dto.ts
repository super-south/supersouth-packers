export class CreateQuoteDto {
  name: string;
  phone: string;
  email?: string;
  movingFrom?: string;
  movingTo?: string;
  toCity?: string;
  moveSize?: string;
  propertySize?: string;
  serviceType?: string;
  moveDate?: string;
  items?: string;
  notes?: string;
}
