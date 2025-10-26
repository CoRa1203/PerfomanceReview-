// ************************************************************************************************************************************************

export class CRUD {
  path: string

  constructor(path: string){
    this.path = path
  }

  printPath(){console.log(this.path)}
  getList(){return getListAPI(this.path)}
  create(data: any){return createAPI(this.path, data)}
  get(id: string | number){return getAPI(this.path + '/' + id)}
  delete(id: string | number){return deleteAPI(this.path + '/' + id)}
  update(id: string | number, data: any){return updateAPI(this.path + '/' + id, data)}
  // TODO 
  // edit(id: string | number, data: any){getListAPI(this.path + '/' + id, data)}
  // creteOrUpdate:
}

// Feedback ************************************************************************************************************************************************

export const APIFeedback = new CRUD('/v0/feedback')

// Review ************************************************************************************************************************************************

export const APIReview = new CRUD('/v0/review')

// Task ************************************************************************************************************************************************

export const APITask = new CRUD('/v0/task')

// export const Task = {
//   path:      '/v0/task',
//   printPath: function(){console.log(this.path)},

//   getList:  function(){return getListAPI(this.path)},
//   create:   function(data: any){createAPI(this.path, data)},
//   get:      function(id: string | number){return getAPI(this.path + '/' + id)},
//   delete:   function(id: string | number){return deleteAPI(this.path + '/' + id)},
//   update:   function(id: string | number, data: any){return updateAPI(this.path + '/' + id, data)},
//   // TODO 
//   // edit:    function(id: string | number, data: any){return getListAPI(this.path + '/' + id, data)},
//   // creteOrUpdate:
// }


// ************************************************************************************************************************************************

export function createUrlAPI(path: string): string {
  // const ROOT_URL_API = process.env.NEXT_PUBLIC_HOST 
  const ROOT_URL_API = 'http://localhost:3000'
  return ROOT_URL_API + `/api` + path
}

async function handlerResponse(response: Response){
  if (response.ok) {
    const data = await response.json()
    if(data.error) {
      throw new Error(data.error)
    } else {
      return data
    }
  } else {
    throw new Error('Что-то пошло не так...')
  }
}

// ************************************************************************************************************************************************

export async function getListAPI(path: string): Promise<any> {
  const url = createUrlAPI(path)
  const response = await fetch(url)
  return await handlerResponse(response)
}

export async function getAPI(path: string): Promise<any> {
  const url = createUrlAPI(path)
  const response = await fetch(url)
  return await handlerResponse(response)
}

export async function createAPI(path: string, data: any): Promise<any> {
  const url = createUrlAPI(path)
  const response = await fetch(url, {
    headers: { 'Content-Type': 'json', },
    body: JSON.stringify(data),
    method: 'POST',
  })
  return await handlerResponse(response)
}

export async function deleteAPI(path: string): Promise<any> {
  const url = createUrlAPI(path)
  const response = await fetch(url, {
    headers: { 'Content-Type': 'json', },
    method: 'DELETE',
  })
  return await handlerResponse(response)
}

export async function updateAPI(path: string, data: any): Promise<any> {
  const url = createUrlAPI(path)
  const response = await fetch(url, {
    headers: { 'Content-Type': 'json', },
    body: JSON.stringify(data),
    method: 'PUT',
  })
  return await handlerResponse(response)
}

export async function editAPI(path: string, data: any): Promise<any> {
  const url = createUrlAPI(path)
  const response = await fetch(url, {
    headers: { 'Content-Type': 'json', },
    body: JSON.stringify(data),
    method: 'PATCH',
  })
  return await handlerResponse(response)
}
