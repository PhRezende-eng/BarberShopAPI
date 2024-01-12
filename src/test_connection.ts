import prisma from './db/prisma_connection';


async function testGetData(): Promise<any> {
    try {
        const users = await prisma.user.findMany();
        const barberShops = await prisma.user.findMany();
        const schedules = await prisma.user.findMany();

        return {
            "users": users,
            "barber_shops": barberShops,
            "schedules": schedules
        };
    } catch (error) {
        console.error('Erro ao testar a conexão:', error);
    } finally {
        // await prisma.$disconnect();
    }
}


async function testPostData(): Promise<any> {
    try {
        const user = await prisma.user.create({
            data: {
                id: 5,
                name: 'Paulo Henrique',
                email: 'paulo@gmail.com',
                password: '12345',
                profile: 'ADM',
                work_days: ['Seg', 'Qua'],
                work_hours: [6, 7, 8],
            },
        });

        const barberShop = await prisma.barbershop.create({
            data: {
                id: 2,
                user_id: 5,
                name: 'Barbearia X',
                email: 'barbearia@gmail.com',
                opening_day: ['Seg', 'Qua', 'Sab'],
                opening_hours: [6, 7, 8, 9, 18, 19, 20, 12, 13],
            },
        });

        const schedule = await prisma.schedule.create({
            data: {
                id: 1,
                barbershop_id: 2,
                user_id: 5,
                client_name: 'Teste',
                date: new Date('2023-08-09'),
                time: 8,
            },
        });

        return {
            "user": user,
            "barber_shop": barberShop,
            "schedule": schedule
        };

    } catch (error) {
        console.error('Erro ao testar a conexão:', error);
    } finally {
        // await prisma.$disconnect();
    }
}

async function testDeletAll(): Promise<any> {
    try {
        const schedules = await prisma.schedule.deleteMany({ where: {} });
        const barberShops = await prisma.barbershop.deleteMany({ where: {} });
        const users = await prisma.user.deleteMany({ where: {} });

        return {
            "users": users,
            "barber_shops": barberShops,
            "schedules": schedules
        };
    } catch (error) {
        console.error('Erro ao testar a conexão:', error);
    } finally {
        // await prisma.$disconnect();
    }
}

export default { testGetData, testPostData, testDeletAll };