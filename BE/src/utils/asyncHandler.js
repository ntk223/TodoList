// tranh lap lai viec viet try catch nhieu lan
// fn: async (req, res, next) => {}
    // return (req, res, next) => {}
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next)
}

export default asyncHandler