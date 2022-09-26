// https://gomakethings.com/true-type-checking-with-vanilla-js/
export default function trueTypeOf(obj) {
	return Object.prototype.toString.call(obj).slice(8, -1);
}