;; send 1/40th to deployer
(define-public (pay (id uint) (price uint))
    (begin
        (try! (stx-transfer? (/ price u40) tx-sender 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM))
        (ok true)))
