// import Sequelize from 'sequelize'
//
// // 初始化Sequelize与数据库的连接
// const Op = Sequelize.Op;
//
// const Medical = new Sequelize('mysql://root:Xutingting20@localhost/medical', {
//   define: {
//     timestamps: false, // 取消Sequelzie自动给数据表加入时间戳（createdAt以及updatedAt）
//     operatorsAliases: Op
//   }
// })
//
// module.exports = {
//     Medical
// }

import mongoose from 'mongoose'
mongoose.connect('mongodb://localhost:27017/mms')

mongoose.connection.on('connected', function () {
  console.log('Mongoose connection open to mongodb://localhost:27017/mms')
})

module.exports = mongoose
