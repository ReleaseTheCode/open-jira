interface SeedData {
  entries: SeedEntry[]
}

interface SeedEntry {
  description: string
  createdAt: number
  status: string
}


export const seedData: SeedData = {
  entries: [
    {
      description: 'Pending Lorem ipsum,  sit amet consectetur adipisicing elit.',
      createdAt: 1,
      status: 'pending'
    },
    {
      description: 'WIP Lorem ipsum, dolor sit amet consectetur  elit.',
      createdAt: 2,
      status: 'in-progress'
    },
    {
      description: 'DONE Lorem ipsum, dolor sit  consectetur adipisicing elit.',
      createdAt: 3,
      status: 'finished'
    },
  ]
}