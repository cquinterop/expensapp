import swaggerAutogen from 'swagger-autogen';

const doc = {
	info: {
		title: 'expensapp API',
		description: 'API for multi-tenant expense management system',
		version: '1.0.0',
	},
	host: 'localhost:3000',
	basePath: '/api',
	schemes: ['http', 'https'],
	securityDefinitions: {
		bearerAuth: {
			type: 'apiKey',
			name: 'Authorization',
			in: 'header',
		},
	},
	components: {
		schemas: {
			CreateRegularExpenseDto: {
				type: 'object',
				required: ['description', 'amount', 'receiptUrl', 'expenseType'],
				properties: {
					description: { type: 'string' },
					amount: { type: 'number', minimum: 0.01 },
					receiptUrl: { type: 'string', format: 'url' },
					expenseType: { type: 'string', enum: ['regular'] },
				},
			},
			CreateTravelExpenseDto: {
				type: 'object',
				required: ['description', 'amount', 'expenseType', 'travelSubtype', 'startDate', 'endDate'],
				properties: {
					description: { type: 'string' },
					amount: { type: 'number', minimum: 0.01 },
					expenseType: { type: 'string', enum: ['travel'] },
					travelSubtype: { type: 'string', enum: ['accommodation', 'transportation', 'other'] },
					startDate: { type: 'string', format: 'date' },
					endDate: { type: 'string', format: 'date' },
					hotelName: { type: 'string' },
					checkInDate: { type: 'string', format: 'date' },
					checkOutDate: { type: 'string', format: 'date' },
					transportationMode: { type: 'string' },
					route: { type: 'string' },
				},
			},
			CreateMileageExpenseDto: {
				type: 'object',
				required: ['description', 'distanceKm', 'expenseType'],
				properties: {
					description: { type: 'string' },
					distanceKm: { type: 'number', minimum: 0.1 },
					ratePerKm: { type: 'number', minimum: 0.01 },
					expenseType: { type: 'string', enum: ['mileage'] },
				},
			},
		},
	},
};

const outputFile = './src/infrastructure/swagger/swagger.json';
const endpointsFiles = ['./src/index.ts'];

swaggerAutogen()(outputFile, endpointsFiles, doc);
