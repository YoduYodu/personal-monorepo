.global find_max_s
.func find_max_s

/*
    int *array   => r0
    int n        => r1
    int max      => r2
    int i        => r3
*/ 

find_max_s:
    mov r3, #0
    ldr r2, [r0]
loop:
    add r0, r0, #4
    add r3, r3, #1
    cmp r3, r1
    beq return_value
    ldr r12, [r0]
    cmp r12, r2
    blt loop
    mov r2, r12
    b loop
return_value:
    mov r0, r2
    bx lr
.endfunc
