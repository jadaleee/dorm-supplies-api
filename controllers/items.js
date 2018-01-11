const Item = require('../models/schemas/item')
const config = require('../models/config')

exports.getInStock = (req, res, next) => {
	Item.find({ quantity: { $gt: 0 } }, (err, items) => {
		if (err) return next(err)
		return res.json(items)
	})
}

// TODO
exports.createNewOrder = (req, res, next) => {
	return res.sendStatus(501)
}

// TODO
exports.getUndeliveredPurchases = (req, res, next) => {
	return res.sendStatus(501)
}

// TODO
exports.getUnpaidPurchases = (req, res, next) => {
	return res.sendStatus(501)
}

/*=============================================
=            C.R.U.D. Routes            
=============================================*/

exports.createItem = (req, res, next) => {
	if (!req.body.name) {
		return res.status(400).send('Must provide item name')
	}
	if (!req.body.price) {
		return res.status(400).send('Must provide item price')
	}
	if (!req.body.quantity) {
		return res.status(400).send('Must provide item quantity')
	}

	const itemData = {
		name: req.body.name,
		price: req.body.price,
		quantity: req.body.quantity,
	}

	// optional fields
	if (req.body.description) itemData.description = req.body.description
	if (req.body.pic) itemData.pic = req.body.pic

	const newItem = new Item(itemData)
	newItem.save((err) => {
		if (err) return next(err)
		return res.json(newItem)
	})
}

exports.getAllItems = (req, res, next) => {
	Item.find({}, (err, items) => {
		if (err) return next(err)
		return res.json(items)
	})
}

exports.getItemById = (req, res, next) => {
	Item.findById(req.params.itemId, (err, item) => {
		if (err) return next(err)
		if (!item) return res.status(404).send('No item with id: ' + req.params.itemId)
		return res.json(item)
	})
}

exports.updateItem = (req, res, next) => {
	Item.findOneAndUpdate({ _id: req.params.itemId }, req.body, {}, (err, item) => {
		if (err) return next(err)
		if (!item) return res.status(404).send('No item with id: ' + req.params.itemId)
		return res.sendStatus(200)
	})
}

exports.deleteItem = (req, res, next) => {
	Item.findByIdAndRemove(req.params.itemId, (err, item) => {
		if (err) return next(err)
		if (!item) return res.status(404).send('Could not find item ' + req.params.itemId)
		return res.json(item)
	})
}