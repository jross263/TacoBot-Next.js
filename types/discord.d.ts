interface User {
  email: string,
  name: string,
  image: string
}

interface Guild {
  features: string[],
  icon:string,
  id: string,
  name: string,
  owner: boolean,
  permissions: number,
  permissions_new: string
}

interface Log {
  userName: string,
  commandName: string,
  timestamp: string
}