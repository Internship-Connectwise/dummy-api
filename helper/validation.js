const validation = (values,items) => {
    try {
      for (item in items) {
        if (!values.includes(item)) {
          console.log("False: "+item)
          return false
        }
      }
      return true
    } catch (err) {
        throw new Error(err);
    }
  };
const atlasSearch = async(query)=>{

}
  module.exports = validation