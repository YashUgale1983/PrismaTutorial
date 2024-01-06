import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function createOperation() {
    await prisma.user.deleteMany(); // this is done only for testing purpose

    // creating multiple users
    // returns count of number of users created
    // with createMany, we can't use 'include', 'select', etc
    const user = await prisma.user.createMany({
        data:[{
            name: "Yash",
            email: "yash@gmail.com",
            age: 27
        },{
            name: "Shravani",
            email: "shravani@gmail.com",
            age: 18
        }]
    })


    // creating a single user
    // const user = await prisma.user.create({
    //     data:{
    //         name: "Yash",
    //         email: "yash@gmail.com",
    //         age: 27,
    //         userPreference:{
    //             // 'create' creates a userPreference when creating the user
    //             // otherwise we would have had to do prisma.userPreference.create
    //             create:{
    //                 emailUpdates: true,
    //             }
    //         }
    //     },
    //     // 'include' includes specified field values in the output as well
    //     include:{
    //         userPreference: true
    //     },
    //     // 'select' includes only the specified field values in output
    //     // 'select' and 'include' both can't be used
    //     // select:{
    //     //     name: true
    //     // }
    // })

    console.log(user);
    
}

// createOperation().catch(e =>{
//     console.log(e.message);
// }).finally(async ()=>{
//     await prisma.$disconnect()
// })

async function readOperation(){

    // // 'findMany' to search for multiple users
    // // we can specify multiple parameters to order the results,
    // // skip some results, take some results, etc.
    // const user = await prisma.user.findMany({
    //     where:{
    //         name: "Yash"
    //     },
    //     orderBy:{
    //         age: "asc"
    //     },
    //     take: 3,
    //     skip: 2
    // })

    // 'findUnique' only works on unique fields
    // if we don't want to search on unique fields, use 'findFirst'
    const user = await prisma.user.findUnique({
        where: {
            name_email:{
                name: "Yash",
                email: "yash@gmail.com"
            }
        }
    })

    console.log(user);
    
}

readOperation().catch(e =>{
    console.log(e.message);
}).finally(async ()=>{
    await prisma.$disconnect()
})