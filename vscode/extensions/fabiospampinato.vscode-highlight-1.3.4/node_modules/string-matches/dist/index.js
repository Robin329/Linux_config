/* STRING MATCHES */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function stringMatches(str, regex, maxMatches) {
    if (maxMatches === void 0) { maxMatches = Infinity; }
    if (regex.flags.indexOf('g') >= 0) {
        var matches = [];
        var match = void 0;
        regex.lastIndex = 0;
        while (match = regex.exec(str)) {
            matches.push(match);
            if (matches.length === maxMatches)
                break;
        }
        return matches;
    }
    else {
        var match = regex.exec(str);
        return match ? [match] : [];
    }
}
/* EXPORT */
exports.default = stringMatches;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0Esb0JBQW9COzs7QUFFcEIsdUJBQXlCLEdBQVcsRUFBRSxLQUFhLEVBQUUsVUFBcUI7SUFBckIsMkJBQUEsRUFBQSxxQkFBcUI7SUFFeEUsRUFBRSxDQUFDLENBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUcsR0FBRyxDQUFFLElBQUksQ0FBRSxDQUFDLENBQUMsQ0FBQztRQUV2QyxJQUFNLE9BQU8sR0FBc0IsRUFBRSxDQUFDO1FBRXRDLElBQUksS0FBSyxTQUFBLENBQUM7UUFFVixLQUFLLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztRQUVwQixPQUFRLEtBQUssR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFHLEdBQUcsQ0FBRSxFQUFHLENBQUM7WUFFcEMsT0FBTyxDQUFDLElBQUksQ0FBRyxLQUFLLENBQUUsQ0FBQztZQUV2QixFQUFFLENBQUMsQ0FBRSxPQUFPLENBQUMsTUFBTSxLQUFLLFVBQVcsQ0FBQztnQkFBQyxLQUFLLENBQUM7UUFFN0MsQ0FBQztRQUVELE1BQU0sQ0FBQyxPQUFPLENBQUM7SUFFakIsQ0FBQztJQUFDLElBQUksQ0FBQyxDQUFDO1FBRU4sSUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBRyxHQUFHLENBQUUsQ0FBQztRQUVqQyxNQUFNLENBQUMsS0FBSyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBRTlCLENBQUM7QUFFSCxDQUFDO0FBRUQsWUFBWTtBQUVaLGtCQUFlLGFBQWEsQ0FBQyJ9