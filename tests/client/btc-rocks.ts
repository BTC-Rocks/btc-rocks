
export function isBoomId(boomId: number, chain: Chain, user: Account) {
  return chain.callReadOnlyFn(
    "btc-rocks",
    "is-boom-id",
    [types.uint(boomId)],
    user.address
  );
}
