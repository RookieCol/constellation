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
	evaluator1: SignerWithAddress
	evaluator2: SignerWithAddress
	evaluator3: SignerWithAddress
	evaluator4: SignerWithAddress
	evaluator5: SignerWithAddress
	evaluator6: SignerWithAddress
}

interface Contracts {
	VRFv2ConsumerMock: any
	hypercerts: any
	teasury: any
	natureLink: any
}

describe('Crownfonding Flow', async function () {
	let accounts: Accounts
	let contracts: Contracts
	let crowdfunding: any
	let evaluation: any

	let numberProject: number
	let length: number = 0
	let planningTimestamp: number

	let users
	let project: any

	beforeEach(async function () {
		const signers = await ethers.getSigners()

		accounts = {
			admin: signers[0],
			user1: signers[1],
			user2: signers[2],
			contributor1: signers[3],
			contributor2: signers[4],
			contributor3: signers[5],
			evaluator1: signers[6],
			evaluator2: signers[7],
			evaluator3: signers[8],
			evaluator4: signers[9],
			evaluator5: signers[10],
			evaluator6: signers[11]
		}

		contracts = await deployContracts()

		const { admin, user1 } = accounts
		const { VRFv2ConsumerMock, hypercerts, teasury, natureLink } = contracts

		const setNaturelinkAddressTx = await VRFv2ConsumerMock.connect(
			admin
		).setNaturelinkAddress(await natureLink.getAddress())
		await setNaturelinkAddressTx.wait(1)

		let amount = ethers.parseEther('10')

		let planning: Date = new Date('2023-11-19T12:00:00Z')
		planningTimestamp = Math.floor(planning.getTime() / 1000)

		let projectTimeStart = new Date('2023-11-20T12:00:00Z')
		let projectTimeStartTimestamp = Math.floor(
			projectTimeStart.getTime() / 1000
		)

		let projectTimeEnd = new Date('2023-11-21T12:00:00Z')
		let projectTimeEndTimestamp = Math.floor(projectTimeEnd.getTime() / 1000)

		let projectTime = [projectTimeStartTimestamp, projectTimeEndTimestamp]

		let info = 'info'

		let createProjectArgs: any = [amount, planningTimestamp, projectTime, info]

		let createProjectTx = await natureLink
			.connect(user1)
			.createProject(...createProjectArgs)
		await createProjectTx.wait(1)

		project = await natureLink.getProjectByUser(user1.address, 1)

		const crowdfundingAddress = project[5]
		const evaluatorAddress = project[6]

		crowdfunding = await ethers.getContractAt(
			'Crowdfunding',
			crowdfundingAddress
		)

		evaluation = await ethers.getContractAt('Evaluation', evaluatorAddress)
	})

	it.skip('The owner of the crownfonding contract must be NatureLInk', async () => {
		// Arrange
		const { natureLink } = contracts

		// Act
		const crowdfundingOwner = await crowdfunding.owner()

		// Assert
		console.log('\n')
		console.log('🏷️  Owner of the crownfonding contract: ')

		try {
			assert.equal(crowdfundingOwner, await natureLink.getAddress())
			console.log('✅ Owner of the crownfonding contract is NatureLink')
		} catch (e) {
			console.log('❌ Owner of the crownfonding contract is not NatureLink')
		}
	})

	it.skip('Evaluator contract has crownfonding address and Crownfonding contrac has evaluation contract', async () => {
		// Arrange
		const { natureLink } = contracts

		// Act
		const evaluationAddressInCrownfonding = await crowdfunding.evaluation()
		const crowdfundingAddressInEvaluation = await evaluation.crowdfunding()

		// Assert
		console.log('\n')
		console.log('🏷️  Evaluation contract has crownfonding address: ')

		try {
			assert.equal(
				crowdfundingAddressInEvaluation,
				await crowdfunding.getAddress()
			)
			console.log('✅ Evaluation contract has crownfonding address')
		} catch (e) {
			console.log('❌ Evaluation contract has not crownfonding address')
		}

		try {
			assert.equal(
				evaluationAddressInCrownfonding,
				await evaluation.getAddress()
			)
			console.log('✅ Crownfonding contract has evaluation address')
		} catch (e) {
			console.log('❌ Crownfonding contract has not evaluation address')
		}
	})

	it.skip('Should be able to contribute to the project', async () => {
		// Arrange
		const { contributor1, contributor2, contributor3 } = accounts

		const stake = ethers.parseEther('1')

		// Act
		const stakeTx = await crowdfunding
			.connect(contributor1)
			.stake({ value: stake })
		await stakeTx.wait(1)

		let contribution = await crowdfunding.balances(contributor1)
		let balance = await crowdfunding.getBalance()
		let threshold = await crowdfunding.threshold()

		// Assert
		console.log('\n')
		console.log('🏷️  Contribution of the contributor: ')

		try {
			assert.equal(contribution, balance)
			console.log('✅ Contribution of the contributor is correct')
		} catch (e) {
			console.log('❌ Contribution of the contributor is not correct')
		}

		try {
			assert.notEqual(contribution, threshold)
			console.log('✅ Threshold is not reached')
		} catch (e) {
			console.log('❌ Threshold is reached')
		}

		// Act
		let index = 0
		while (index < 9) {
			const stakeTx = await crowdfunding
				.connect(contributor2)
				.stake({ value: stake })
			await stakeTx.wait(1)

			index++
		}

		contribution = await crowdfunding.balances(contributor1)
		balance = await crowdfunding.getBalance()
		threshold = await crowdfunding.threshold()

		// Assert
		console.log('\n')
		console.log('🏷️  The skate is complete: ')

		try {
			await expect(
				crowdfunding.connect(contributor3).stake({ value: stake })
			).revertedWith('stake: the staker is closed')
			console.log('✅ The skate is complete')
		} catch (e) {
			console.log('❌ The skate is not complete')
		}
	})

	it.skip('Should revert if the project doesn´t complete evaluators', async () => {
		// Arrange
		const { user1, contributor1, contributor2, contributor3 } = accounts

		const stake = ethers.parseEther('1')

		// Act
		const stakeTx = await crowdfunding
			.connect(contributor1)
			.stake({ value: stake })
		await stakeTx.wait(1)

		let index = 0
		while (index < 9) {
			const stakeTx = await crowdfunding
				.connect(contributor2)
				.stake({ value: stake })
			await stakeTx.wait(1)

			index++
		}

		const currentBlock = await ethers.provider.getBlock('latest')
		const currentTime = currentBlock.timestamp

		let timeToMoveForward = planningTimestamp - currentTime
		timeToMoveForward += 60

		moveTime(timeToMoveForward)

		const contribution = await crowdfunding.balances(contributor1)
		const balance = await crowdfunding.getBalance()
		const threshold = await crowdfunding.threshold()

		// Assert
		console.log('\n')
		console.log('🏷️  The skate is complete: ')

		try {
			await expect(crowdfunding.connect(user1).execute()).revertedWith(
				'execute: failed to select evaluators'
			)
			console.log('✅ insufficient evaluators')
		} catch (e) {
			console.log('❌ sufficient evaluators' + e)
		}
	})

	it.skip('Should execute because the project has 3 evaluator', async () => {
		// Arrange
		const {
			user1,
			contributor1,
			contributor2,
			contributor3,
			evaluator1,
			evaluator2,
			evaluator3
		} = accounts

		const stake = ethers.parseEther('1')

		const proposeEvaluatorTx1 = await evaluation
			.connect(evaluator1)
			.proposeEvaluator()
		await proposeEvaluatorTx1.wait(1)

		const proposeEvaluatorTx2 = await evaluation
			.connect(evaluator2)
			.proposeEvaluator()
		await proposeEvaluatorTx2.wait(1)

		const proposeEvaluatorTx3 = await evaluation
			.connect(evaluator3)
			.proposeEvaluator()
		await proposeEvaluatorTx3.wait(1)

		// Act
		const stakeTx = await crowdfunding
			.connect(contributor1)
			.stake({ value: stake })
		await stakeTx.wait(1)

		let index = 0
		while (index < 9) {
			const stakeTx = await crowdfunding
				.connect(contributor2)
				.stake({ value: stake })
			await stakeTx.wait(1)

			index++
		}

		const currentBlock = await ethers.provider.getBlock('latest')
		const currentTime = currentBlock.timestamp

		let timeToMoveForward = planningTimestamp - currentTime
		timeToMoveForward += 60

		moveTime(timeToMoveForward)

		const threshold = await crowdfunding.threshold()
		const balance = await crowdfunding.getBalance()
		const bounty = await crowdfunding.bounty()
		const fee = await crowdfunding.fee()

		console.log('threshold', threshold.toString())
		console.log('balance', balance.toString())
		console.log('bounty', bounty.toString())
		console.log('fee', fee.toString())
		console.log('bounty withou fee', (bounty - fee).toString())

		const executeTx = await crowdfunding.connect(user1).execute()
		await executeTx.wait(1)

		const openForWithdraw = await crowdfunding.openForWithdraw()

		// Assert
		console.log('\n')
		console.log('🏷️  The skate is closed: ')

		try {
			assert.isFalse(openForWithdraw)
			console.log('✅ The skate is closed')
		} catch (e) {
			console.log('❌ The skate is not closed', e)
		}
	})

	it.skip('Should execute because the project has more of the 3 evaluator', async () => {
		// Arrange
		const {
			user1,
			contributor1,
			contributor2,
			contributor3,
			evaluator1,
			evaluator2,
			evaluator3,
			evaluator4,
			evaluator5,
			evaluator6
		} = accounts

		const { natureLink, VRFv2ConsumerMock } = contracts

		const stake = ethers.parseEther('1')

		const proposeEvaluatorTx1 = await evaluation
			.connect(evaluator1)
			.proposeEvaluator()
		await proposeEvaluatorTx1.wait(1)

		const proposeEvaluatorTx2 = await evaluation
			.connect(evaluator5)
			.proposeEvaluator()
		await proposeEvaluatorTx2.wait(1)

		const proposeEvaluatorTx3 = await evaluation
			.connect(evaluator3)
			.proposeEvaluator()
		await proposeEvaluatorTx3.wait(1)

		const proposeEvaluatorTx4 = await evaluation
			.connect(evaluator6)
			.proposeEvaluator()
		await proposeEvaluatorTx4.wait(1)

		// Act
		const stakeTx = await crowdfunding
			.connect(contributor1)
			.stake({ value: stake })
		await stakeTx.wait(1)

		let index = 0
		while (index < 9) {
			const stakeTx = await crowdfunding
				.connect(contributor2)
				.stake({ value: stake })
			await stakeTx.wait(1)

			index++
		}

		const currentBlock = await ethers.provider.getBlock('latest')
		const currentTime = currentBlock.timestamp

		let timeToMoveForward = planningTimestamp - currentTime
		timeToMoveForward += 60

		moveTime(timeToMoveForward)

		const executeTx = await crowdfunding.connect(user1).execute()
		await executeTx.wait(1)

		const openForWithdraw = await crowdfunding.openForWithdraw()

		// Assert
		console.log('\n')
		console.log('🏷️  The skate is closed: ')

		try {
			assert.isFalse(openForWithdraw)
			console.log('✅ The skate is closed')
		} catch (e) {
			console.log('❌ The skate is not closed', e)
		}
	})

	it.skip('Should execute because the project has more of the 3 evaluator', async () => {
		// Arrange
		const {
			admin,
			user1,
			contributor1,
			contributor2,
			contributor3,
			evaluator1,
			evaluator2,
			evaluator3,
			evaluator4,
			evaluator5,
			evaluator6
		} = accounts

		const { natureLink, VRFv2ConsumerMock } = contracts

		const stake = ethers.parseEther('1')

		const proposeEvaluatorTx1 = await evaluation
			.connect(evaluator1)
			.proposeEvaluator()
		await proposeEvaluatorTx1.wait(1)

		const proposeEvaluatorTx2 = await evaluation
			.connect(evaluator5)
			.proposeEvaluator()
		await proposeEvaluatorTx2.wait(1)

		const proposeEvaluatorTx3 = await evaluation
			.connect(evaluator3)
			.proposeEvaluator()
		await proposeEvaluatorTx3.wait(1)

		const proposeEvaluatorTx4 = await evaluation
			.connect(evaluator6)
			.proposeEvaluator()
		await proposeEvaluatorTx4.wait(1)

		const stakeTx = await crowdfunding
			.connect(contributor1)
			.stake({ value: stake })
		await stakeTx.wait(1)

		let index = 0
		while (index < 9) {
			const stakeTx = await crowdfunding
				.connect(contributor2)
				.stake({ value: stake })
			await stakeTx.wait(1)

			index++
		}

		const currentBlock = await ethers.provider.getBlock('latest')
		const currentTime = currentBlock.timestamp

		let timeToMoveForward = planningTimestamp - currentTime
		timeToMoveForward += 60

		moveTime(timeToMoveForward)

		const executeTx = await crowdfunding.connect(user1).execute()
		await executeTx.wait(1)

		// Assert
		console.log('\n')
		console.log('🏷️  Evaluation contract has the correct address: ')
		try {
			assert.equal(
				await evaluation.getAddress(),
				await VRFv2ConsumerMock.evaluation()
			)
			console.log('✅ evaluation address is correct')
		} catch (e) {
			console.log('❌ evaluation address is not correct', e)
		}

		// Act
		const requestId = 1
		const randomWords = [
			ethers.toBigInt('11579208923731619541312963993'),
			ethers.toBigInt('11579208923731619541312963993'),
			ethers.toBigInt('115792089237316195413163954131541315413194')
		]

		const fulfillRandomWordsMockTx = await VRFv2ConsumerMock.connect(
			admin
		).fulfillRandomWordsMock(requestId, randomWords)

		await fulfillRandomWordsMockTx.wait(1)

		// Assert
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
