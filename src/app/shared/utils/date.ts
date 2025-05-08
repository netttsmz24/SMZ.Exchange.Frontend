export class DateUtility {
    today = new Date();
    day = String(this.today.getDate()).padStart(2, '0');
    month = String(this.today.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    year = this.today.getFullYear();
    getCurrenctDate(): string {
        return `${this.year}-${this.month}-${this.day}`;
    }
}