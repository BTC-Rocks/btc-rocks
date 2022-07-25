export function smartTrim(string, maxLength) {
  if (!string) return string;
  if (maxLength < 1) return string;
  if (string.length <= maxLength) return string;
  if (maxLength == 1) return string.substring(0, 1) + "...";

  let [principal, contractName] = string.split(".");
  console.log(principal, contractName);
  var midpoint = Math.ceil(principal.length / 2);
  var toremove = principal.length - maxLength;
  var lstrip = Math.ceil(toremove / 2);
  var rstrip = toremove - lstrip;

  return (
    principal.substring(0, midpoint - lstrip) +
    "..." +
    principal.substring(midpoint + rstrip) +
    (contractName ? `.${contractName}` : "")
  );
}
