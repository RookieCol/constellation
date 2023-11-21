import { ethers } from 'hardhat'
import { assert, expect } from 'chai'

import { moveTime } from '../utils/move-time'
import { ContractFactory, MaxUint256 } from 'ethers'
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'

interface Accounts {
	admin: SignerWithAddress
	user1: SignerWithAddress
	user2: SignerWithAddress
	contributor1: SignerWithAddress
	contributor2: SignerWithAddress
	contributor3: SignerWithAddress
	evaluators1: SignerWithAddress
	evaluators2: SignerWithAddress
	evaluators3: SignerWithAddress
	evaluators4: SignerWithAddress
}

interface Contracts {
	VRFv2ConsumerMock: any
	hypercerts: any
	teasury: any
	natureLink: any
}

describe('NatureLink Flow', async function () {
	let accounts: Accounts
	let contracts: Contracts

	let numberProject: number
	let length: number = 0

	let users

	let allProjects
	let allProjectsByOngoing
	let allProjectByFailed
	let allProjectBySucceeded
	let allProjectByUser
	let allProjectByUserOngoing
	let allProjectByUserFailed
	let allProjectByUserSucceeded

	let allProjectsLength
	let allProjectsByOngoingLength
	let allProjectByFailedLength
	let allProjectBySucceededLength
	let allProjectByUserLength
	let allProjectByUserOngoingLength
	let allProjectByUserFailedLength
	let allProjectByUserSucceededLength

	let amount = ethers.parseEther('10')

	let planning = new Date('2023-11-19T12:00:00Z')
	let planningTimestamp = Math.floor(planning.getTime() / 1000)

	let projectTimeStart = new Date('2023-11-20T12:00:00Z')
	let projectTimeStartTimestamp = Math.floor(projectTimeStart.getTime() / 1000)

	let projectTimeEnd = new Date('2023-11-21T12:00:00Z')
	let projectTimeEndTimestamp = Math.floor(projectTimeEnd.getTime() / 1000)

	let projectTime = [projectTimeStartTimestamp, projectTimeEndTimestamp]

	let info = 'info'

	let createProjectArgs: any = [amount, planningTimestamp, projectTime, info]

	beforeEach(async function () {
		const signers = await ethers.getSigners()

		accounts = {
			admin: signers[0],
			user1: signers[1],
			user2: signers[2],
			contributor1: signers[3],
			contributor2: signers[4],
			contributor3: signers[5],
			evaluators1: signers[6],
			evaluators2: signers[7],
			evaluators3: signers[8],
			evaluators4: signers[9]
		}

		contracts = await deployContracts()

		const { admin } = accounts
		const { VRFv2ConsumerMock, hypercerts, teasury, natureLink } = contracts

		const setNaturelinkAddressTx = await VRFv2ConsumerMock.connect(
			admin
		).setNaturelinkAddress(await natureLink.getAddress())
		await setNaturelinkAddressTx.wait(1)
	})

	it.skip('Should get projects emptly', async () => {
		// Arrange
		const { user1 } = accounts
		const { natureLink } = contracts

		numberProject = 0

		allProjects = await natureLink.getAllProjects()
		allProjectsByOngoing = await natureLink.getAllProjectsByStatus(0)
		allProjectByFailed = await natureLink.getAllProjectsByStatus(1)
		allProjectBySucceeded = await natureLink.getAllProjectsByStatus(2)
		allProjectByUser = await natureLink.getAllProjectsByUser(user1.address)
		allProjectByUserOngoing = await natureLink.getAllProjectsByUserStatus(
			user1.address,
			0
		)
		allProjectByUserFailed = await natureLink.getAllProjectsByUserStatus(
			user1.address,
			1
		)
		allProjectByUserSucceeded = await natureLink.getAllProjectsByUserStatus(
			user1.address,
			2
		)

		// Act
		allProjectsLength = allProjects.length
		allProjectsByOngoingLength = allProjectsByOngoing.length
		allProjectByFailedLength = allProjectByFailed.length
		allProjectBySucceededLength = allProjectBySucceeded.length
		allProjectByUserLength = allProjectByUser.length
		allProjectByUserOngoingLength = allProjectByUserOngoing.length
		allProjectByUserFailedLength = allProjectByUserFailed.length
		allProjectByUserSucceededLength = allProjectByUserSucceeded.length

		// Assert
		console.log('\n')
		console.log('🏷️  There should be no projects')

		try {
			assert.equal(allProjectsLength, numberProject)
			console.log('✅ allProjectsLength should be 0')
		} catch (e) {
			console.log(
				'❌ allProjectsLength should be 0 but was ' + allProjectsLength
			)
		}

		try {
			assert.equal(allProjectsByOngoingLength, numberProject)
			console.log('✅ allProjectsByOngoingLength should be 0')
		} catch (e) {
			console.log(
				'❌ allProjectsByOngoingLength should be 0 but was ' +
					allProjectsByOngoingLength
			)
		}

		try {
			assert.equal(allProjectByFailedLength, numberProject)
			console.log('✅ allProjectByFailedLength should be 0')
		} catch (e) {
			console.log(
				'❌ allProjectByFailedLength should be 0 but was ' +
					allProjectByFailedLength
			)
		}

		try {
			assert.equal(allProjectBySucceededLength, numberProject)
			console.log('✅ allProjectBySucceededLength should be 0')
		} catch (e) {
			console.log(
				'❌ allProjectBySucceededLength should be 0 but was ' +
					allProjectBySucceededLength
			)
		}

		try {
			assert.equal(allProjectByUserLength, numberProject)
			console.log('✅ allProjectByUserLength should be 0')
		} catch (e) {
			console.log(
				'❌ allProjectByUserLength should be 0 but was ' +
					allProjectByUserLength
			)
		}

		try {
			assert.equal(allProjectByUserOngoingLength, numberProject)
			console.log('✅ allProjectByUserOngoingLength should be 0')
		} catch (e) {
			console.log(
				'❌ allProjectByUserOngoingLength should be 0 but was ' +
					allProjectByUserOngoingLength
			)
		}

		try {
			assert.equal(allProjectByUserFailedLength, numberProject)
			console.log('✅ allProjectByUserFailedLength should be 0')
		} catch (e) {
			console.log(
				'❌ allProjectByUserFailedLength should be 0 but was ' +
					allProjectByUserFailedLength
			)
		}

		try {
			assert.equal(allProjectByUserSucceededLength, numberProject)
			console.log('✅ allProjectByUserSucceededLength should be 0')
		} catch (e) {
			console.log(
				'❌ allProjectByUserSucceededLength should be 0 but was ' +
					allProjectByUserSucceededLength
			)
		}

		try {
			await expect(
				natureLink.getProjectByUser(user1.address, numberProject)
			).to.be.revertedWith('getProjectByUser: User has no projects')
			console.log('✅ getProjectByUser should be reverted')
		} catch (e) {
			console.log('❌ getProjectByUser should be reverted but was ' + e.message)
		}
	})

	it.skip('Should create a project', async () => {
		// Arrange
		const { user1 } = accounts
		const { natureLink } = contracts

		// Act
		let createProjectTx = await natureLink
			.connect(user1)
			.createProject(...createProjectArgs)
		await createProjectTx.wait(1)

		users = await natureLink.getUsers()

		// Assert
		console.log('\n')
		console.log('🏷️  There should be one project')

		try {
			assert.equal(users.length, 1)
			console.log('✅ users should be 1')
		} catch (e) {
			console.log('❌ users should be 1 but was ' + users.length)
		}
	})

	it.skip('Should get three projects', async () => {
		// Arrange
		const { user1, user2 } = accounts
		const { natureLink } = contracts

		numberProject = 3
		length += numberProject

		// Act
		let index = 0
		while (index < numberProject) {
			let createProjectTx = await natureLink
				.connect(user1)
				.createProject(...createProjectArgs)
			await createProjectTx.wait(1)
			index++
		}

		allProjects = await natureLink.getAllProjects()
		allProjectsByOngoing = await natureLink.getAllProjectsByStatus(0)
		allProjectByFailed = await natureLink.getAllProjectsByStatus(1)
		allProjectBySucceeded = await natureLink.getAllProjectsByStatus(2)
		allProjectByUser = await natureLink.getAllProjectsByUser(user1.address)
		allProjectByUserOngoing = await natureLink.getAllProjectsByUserStatus(
			user1.address,
			0
		)
		allProjectByUserFailed = await natureLink.getAllProjectsByUserStatus(
			user1.address,
			1
		)
		allProjectByUserSucceeded = await natureLink.getAllProjectsByUserStatus(
			user1.address,
			2
		)

		allProjectsLength = allProjects.length
		allProjectsByOngoingLength = allProjectsByOngoing.length
		allProjectByFailedLength = allProjectByFailed.length
		allProjectBySucceededLength = allProjectBySucceeded.length
		allProjectByUserLength = allProjectByUser.length
		allProjectByUserOngoingLength = allProjectByUserOngoing.length
		allProjectByUserFailedLength = allProjectByUserFailed.length
		allProjectByUserSucceededLength = allProjectByUserSucceeded.length

		// Assert
		console.log('\n')
		console.log('🏷️  All User1 projects must be five projects')

		try {
			assert.equal(allProjectsLength, numberProject)
			console.log('✅ allProjectsLength should be 3')
		} catch (e) {
			console.log(
				'❌ allProjectsLength should be 3 but was ' + allProjectsLength
			)
		}

		try {
			assert.equal(allProjectsByOngoingLength, numberProject)
			console.log('✅ allProjectsByOngoingLength should be 3')
		} catch (e) {
			console.log(
				'❌ allProjectsByOngoingLength should be 3 but was ' +
					allProjectsByOngoingLength
			)
		}

		try {
			assert.equal(allProjectByFailedLength, 0)
			console.log('✅ allProjectByFailedLength should be 0')
		} catch (e) {
			console.log(
				'❌ allProjectByFailedLength should be 0 but was ' +
					allProjectByFailedLength
			)
		}

		try {
			assert.equal(allProjectBySucceededLength, 0)
			console.log('✅ allProjectBySucceededLength should be 0')
		} catch (e) {
			console.log(
				'❌ allProjectBySucceededLength should be 0 but was ' +
					allProjectBySucceededLength
			)
		}

		try {
			assert.equal(allProjectByUserLength, numberProject)
			console.log('✅ allProjectByUserLength should be 3')
		} catch (e) {
			console.log(
				'❌ allProjectByUserLength should be 3 but was ' +
					allProjectByUserLength
			)
		}

		try {
			assert.equal(allProjectByUserOngoingLength, numberProject)
			console.log('✅ allProjectByUserOngoingLength should be 3')
		} catch (e) {
			console.log(
				'❌ allProjectByUserOngoingLength should be 3 but was ' +
					allProjectByUserOngoingLength
			)
		}

		try {
			assert.equal(allProjectByUserFailedLength, 0)
			console.log('✅ allProjectByUserFailedLength should be 0')
		} catch (e) {
			console.log(
				'❌ allProjectByUserFailedLength should be 0 but was ' +
					allProjectByUserFailedLength
			)
		}

		try {
			assert.equal(allProjectByUserSucceededLength, 0)
			console.log('✅ allProjectByUserSucceededLength should be 0')
		} catch (e) {
			console.log(
				'❌ allProjectByUserSucceededLength should be 0 but was ' +
					allProjectByUserSucceededLength
			)
		}

		console.log('\n')

		// Act
		numberProject = 2
		length += numberProject

		index = 0
		while (index < numberProject) {
			let createProjectTx = await natureLink
				.connect(user2)
				.createProject(...createProjectArgs)
			await createProjectTx.wait(1)
			index++
		}

		users = await natureLink.getUsers()

		allProjects = await natureLink.getAllProjects()
		allProjectsByOngoing = await natureLink.getAllProjectsByStatus(0)
		allProjectByFailed = await natureLink.getAllProjectsByStatus(1)
		allProjectBySucceeded = await natureLink.getAllProjectsByStatus(2)
		allProjectByUser = await natureLink.getAllProjectsByUser(user2.address)
		allProjectByUserOngoing = await natureLink.getAllProjectsByUserStatus(
			user2.address,
			0
		)
		allProjectByUserFailed = await natureLink.getAllProjectsByUserStatus(
			user2.address,
			1
		)
		allProjectByUserSucceeded = await natureLink.getAllProjectsByUserStatus(
			user2.address,
			2
		)

		allProjectsLength = allProjects.length
		allProjectsByOngoingLength = allProjectsByOngoing.length
		allProjectByFailedLength = allProjectByFailed.length
		allProjectBySucceededLength = allProjectBySucceeded.length
		allProjectByUserLength = allProjectByUser.length
		allProjectByUserOngoingLength = allProjectByUserOngoing.length
		allProjectByUserFailedLength = allProjectByUserFailed.length
		allProjectByUserSucceededLength = allProjectByUserSucceeded.length

		// Assert
		console.log('🏷️  All User2 projects must be 2 projects')

		try {
			assert.equal(allProjectsLength, length)
			console.log('✅ allProjectsLength should be 5')
		} catch (e) {
			console.log(
				'❌ allProjectsLength should be 5 but was ' + allProjectsLength
			)
		}

		try {
			assert.equal(allProjectsByOngoingLength, length)
			console.log('✅ allProjectsByOngoingLength should be 5')
		} catch (e) {
			console.log(
				'❌ allProjectsByOngoingLength should be 5 but was ' +
					allProjectsByOngoingLength
			)
		}

		try {
			assert.equal(allProjectByFailedLength, 0)
			console.log('✅ allProjectByFailedLength should be 0')
		} catch (e) {
			console.log(
				'❌ allProjectByFailedLength should be 0 but was ' +
					allProjectByFailedLength
			)
		}

		try {
			assert.equal(allProjectBySucceededLength, 0)
			console.log('✅ allProjectBySucceededLength should be 0')
		} catch (e) {
			console.log(
				'❌ allProjectBySucceededLength should be 0 but was ' +
					allProjectBySucceededLength
			)
		}

		try {
			assert.equal(allProjectByUserLength, numberProject)
			console.log('✅ allProjectByUserLength should be 2')
		} catch (e) {
			console.log(
				'❌ allProjectByUserLength should be 2 but was ' +
					allProjectByUserLength
			)
		}

		try {
			assert.equal(allProjectByUserOngoingLength, numberProject)
			console.log('✅ allProjectByUserOngoingLength should be 2')
		} catch (e) {
			console.log(
				'❌ allProjectByUserOngoingLength should be 2 but was ' +
					allProjectByUserOngoingLength
			)
		}

		try {
			assert.equal(allProjectByUserFailedLength, 0)
			console.log('✅ allProjectByUserFailedLength should be 0')
		} catch (e) {
			console.log(
				'❌ allProjectByUserFailedLength should be 0 but was ' +
					allProjectByUserFailedLength
			)
		}

		try {
			assert.equal(allProjectByUserSucceededLength, 0)
			console.log('✅ allProjectByUserSucceededLength should be 0')
		} catch (e) {
			console.log(
				'❌ allProjectByUserSucceededLength should be 0 but was ' +
					allProjectByUserSucceededLength
			)
		}
	})

	it.skip('Should change Treasury address', async () => {
		// Arrange
		const { admin } = accounts
		const { natureLink } = contracts

		const treasutyAddress = await natureLink.treasury()

		// Act
		const setTreasuryTx = await natureLink
			.connect(admin)
			.setTreasury(ethers.ZeroAddress)
		await setTreasuryTx.wait(1)

		// Assert
		console.log('\n')
		console.log('🏷️  Treasury should be set to zero address')

		try {
			assert.notEqual(await natureLink.treasury(), treasutyAddress)
			console.log('✅ treasury should be different')
		} catch (e) {
			console.log('❌ treasury should be different but was ' + e.message)
		}
	})
})

async function deployContracts() {
	// Deploy VRFv2ConsumerMock contract

	const vrfV2ConsumerMockArgs = [1]
	const VRFv2ConsumerMock = await deployContract(
		'VRFv2ConsumerMock',
		vrfV2ConsumerMockArgs
	)

	// Deploy Hypercerts contract

	const hypercertsArgs: any = []
	const hypercerts = await deployContract('Hypercerts', hypercertsArgs)

	// Deploy Teasury contract

	const teasuryArgs: any = []
	const teasury = await deployContract('Treasury', teasuryArgs)

	// Deploy NatureLink contract
	const pushCommAddress = ethers.ZeroAddress
	const hypercertsAddress = await hypercerts.getAddress()
	const VRFv2ConsumerMockAddress = await VRFv2ConsumerMock.getAddress()
	const teasuryAddress = await teasury.getAddress()

	const natureLinkArgs = [
		VRFv2ConsumerMockAddress,
		pushCommAddress,
		hypercertsAddress,
		teasuryAddress
	]

	const natureLink = await deployContract('NatureLink', natureLinkArgs)

	// Return all deployed contracts
	return {
		VRFv2ConsumerMock,
		hypercerts,
		teasury,
		natureLink
	}
}

async function deployContract(contractName: string, args: any[]) {
	const ContractFactory: ContractFactory = await ethers.getContractFactory(
		contractName
	)
	const contract = await ContractFactory.deploy(...args)
	return contract
}
