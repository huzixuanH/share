const EventEmitter = require("events");
const fs = require("fs");

// /** write stream */
// const writeStream = fs.createWriteStream(
//   "./node-server.js",
//   {
//     flags: "a", // 追加写
//   });
// writeStream.write("console.log()", (err) => {
//   console.log('写完');
// });
// writeStream.end("console.log()", (err) => {
//   console.log('写完并关闭流'); 
// });
// // 或调用close关闭流
// // 其他：finish方法写完后触发

/** read stream */
// const readstream = fs.createReadStream(
//   './node-server.js',
//   {
//     start: 0, 				// 开始位置
//     end:4, 					  // 结束位置，包前包后
//     // highWaterMark: 3  // 一次读取几个字节，默认64kb
//   }
// );
// readstream.on("open", (fd) => { // 打开文件监听 open
//   console.log(fd); // 系统文件描述符
// });
// readstream.on("data", (data) => { // 读取事件监听 data
//   console.log(data.toString());
// });
// // 其他事件：读取完成触发 end 事件；文件关闭触发 close 事件
// readstream.pipe(writeStream);

/** events */
// const emitter = new EventEmitter();
// emitter.on("e1", (p1, p2) => {
//   console.log("e1", p1, p2);
// });
// emitter.emit("e1", "param1", "param2");

/** Buffer */
// const buffer = Buffer.from('你好-Hello', 'utf8'); // 默认utf8
// console.log(buffer); // <Buffer e4 bd a0 e5 a5 bd 2d 48 65 6c 6c 6f>
// console.log(buffer.toString()); // 你好-Hello
// console.log(buffer.toString('utf16le')); // 뷤붥䠭汥潬console.log()console.log()console.log()console.log()console.log()console.log()