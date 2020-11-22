/* eslint-disable no-console */
/* eslint-disable space-before-function-paren */
/* eslint-disable indent */

export const state = () => ({
    statusArray: [
        'DRAFT',
        'READY_FOR_VALIDATION',
        'APPROVED',
        'REJECTED',
        'DELETED'
    ]
})
export const getters = {
    getStatusArray(state) {
        return state.statusArray
    }
}
