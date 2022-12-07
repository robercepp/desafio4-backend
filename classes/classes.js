const fs = require("fs");

module.exports = class Contenedor {
  constructor(archivo) {
    this.archivo = archivo;
  }
 async fileChecker() {
    if(!fs.existsSync(this.archivo)){
        try{
        await fs.promises.writeFile(this.archivo, "[]")
        } catch(error) {
        console.log('error!: ',error)
        }
    }
}
  async getAll() {
    await this.fileChecker()
    try {
      const file = await fs.promises.readFile(this.archivo, "utf-8");
      const data = JSON.parse(file);
      return data;
    } catch (error) {
      console.log("error!: ", error);
    }
  }
  async getById(id) {
    await this.fileChecker()
    try {
      const file = await fs.promises.readFile(this.archivo, "utf-8");
      const data = JSON.parse(file);
      const index = data.findIndex((producto) => producto.id == id);
      return data[index] || {error: 'producto no encontrado'};
    } catch (error) {
      console.log("error!: ", error);
    }
  }
  async save(object) {
   await this.fileChecker()
    try{
        const agregar = object
        const file = await fs.promises.readFile(this.archivo, 'utf-8')
        const data = JSON.parse(file)
        const ids = data.map(producto => producto.id)
        const idMaximo = Math.max(...ids)
        if(!object.title){
          return {error: 'no se agregó un nombre. el producto no fue guardado'}
        } else if (!object.price) {
          return {error: 'no se agregó un precio. el producto no fue guardado'}
        } else if (!object.thumbnail){
          return {error: 'no se agregó un thumbnail. el producto no fue guardado'}
        } else if(idMaximo == -Infinity ) {
            agregar.id = 1
            data.push(agregar)
            await fs.promises.writeFile(this.archivo, JSON.stringify(data, null, 2))
            return agregar
        } else {
            const idMaximo = Math.max(...ids)
            agregar.id = idMaximo +1
            data.push(agregar)
            await fs.promises.writeFile(this.archivo, JSON.stringify(data, null, 2))
            return agregar
        }
    } catch(error) {
        console.log('error!: ',error)
    }
}
async update(object){
  await this.fileChecker()
  try{
    const file = await fs.promises.readFile(this.archivo, 'utf-8')
    const data = JSON.parse(file)
    const index = data.findIndex(producto => producto.id == object.id)
    if (index == -1) {
      return {error: 'producto no encontrado'}
    } else if(!object.title){
      return {error: 'atención, no se ha introducido un nombre'}
  } else if(!object.price) {
      return {error: 'atención, no se ha introducido un precio'}
  } else if(!object.thumbnail){
      return {error: 'atención, no se ha introducido un thumbnail'}
  } else {
      data.splice (index, 1, object)
      await fs.promises.writeFile(this.archivo, JSON.stringify(data, null, 2))
    }
  } catch(error) {
    console.log('error!: ',error)
  }
}
async deleteById(number) {
  await this.fileChecker()
  try{
      const file = await fs.promises.readFile(this.archivo, 'utf-8')
      const data = JSON.parse(file)
      const index = data.findIndex(producto => producto.id == number)
      if (index == -1){
        return {error: 'producto no encontrado'}
      } else {
      data.splice (index, 1)
      await fs.promises.writeFile(this.archivo, JSON.stringify(data, null, 2))
      }
  } catch(error) {
      console.log('error!: ',error)
  }
}
};