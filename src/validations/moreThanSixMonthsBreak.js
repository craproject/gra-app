// checkBreakReverse(args) {
// 	if (args.index === 0) return true;
// 	let prevStart = this.getValue2(args.parent, args.index - 1, args.start);
// 	let nxtEnd = this.getValue2(args.parent, args.index, args.end);
// 	if (prevStart && nxtEnd) {
// 		let nxtEndDate = new Date(nxtEnd);
// 		let prevStartDate = new Date(prevStart);
// 		if (this.isValidDate(nxtEndDate) && this.isValidDate(prevStartDate)) {
// 			return this.monthDiff(nxtEndDate, prevStartDate) <= 6;
// 		} else return false;
// 	} else return true;
// }
