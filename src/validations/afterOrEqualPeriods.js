export function afterOrEqualPeriods(context, ...args) {
    let start, end;

    if (args.parent) {
        start = this.getValue2(args.parent, args.index, args.start);
        end = this.getValue2(args.parent, args.index, args.end);
    } else {
        start = this.getValue1(args.start);
        end = this.getValue1(args.end);
    }

    if (start && end) {
        let startDate = new Date(start);
        let endDate = new Date(end);
        return this.isValidDate(startDate) && this.isValidDate(endDate)
            ? startDate <= endDate
            : false;
    }

    return true;
}
