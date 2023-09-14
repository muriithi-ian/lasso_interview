import express from "express";
import { v4 as uuid } from "uuid";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

const diagrams = [];

class Diagram {
	constructor() {
		this.diagramId = uuid();
		this.shapes = [];
		this.connections = [];
	}

	//add shape to diagram
	addShape(newShape) {
		let addedShape;

		switch (newShape.type) {
			case "circle":
				addedShape = this.addShape(
					new Circle(newShape.size, newShape.position)
				);
				return `created circle: ${addedShape.shapeId}`;
			case "triangle":
				addedShape = this.addShape(
					new Triangle(newShape.size, newShape.position)
				);
				return `created triangle: ${addedShape.shapeId}`;
			case "square":
				addedShape = this.addShape(
					new Square(newShape.size, newShape.position)
				);
				return `created square: ${addedShape.shapeId}`;
			case "rectangle":
				addedShape = this.addShape(
					new Rectangle(newShape.size, newShape.position)
				);
				return `created rectangle: ${addedShape.shapeId}`;
			default:
				return null;
		}
	}

	//add connection to diagram
	addConnection(connection) {
		this.connections.push(connection);
		return "connection added";
	}

	//get all shapes
	getShapes() {
		return this.shapes;
	}

	//get all connections
	getConnections() {
		return this.connections;
	}

	//get shape by id
	getShapeById(shapeId) {
		return this.shapes.find((shape) => shape.shapeId === shapeId);
	}

	// resize shape by id
	resizeShape(shapeId, size) {
		const shape = this.getShapeById(shapeId);
		shape.size = size;
		return `shape ${shapeId} resized to ${size}`;
	}

	//get connection by id
	getConnectionById(connectionId) {
		return this.connections.find(
			(connection) => connection.connectionId === connectionId
		);
	}

	//delete shape by id
	deleteShapeById(shapeId) {
		this.shapes = this.shapes.filter((shape) => shape.shapeId !== shapeId);
		return `shape ${shapeId} deleted`;
	}

	//delete connection by id
	deleteConnectionById(connectionId) {
		this.connections = this.connections.filter(
			(connection) => connection.connectionId !== connectionId
		);
		return "connection deleted";
	}

	// move shape
	moveShape(shapeId, position) {
		const shape = this.getShapeById(shapeId);
		shape.position = position;
		return `shape ${shapeId} moved to ${position}`;
	}
}

class Connection {
	constructor(startShapeId, endShapeId) {
		this.connectionId = uuid();
		this.startShapeId = startShapeId;
		this.endShapeId = endShapeId;
	}
}

class Shape {
	constructor(type, size, position) {
		this.shapeId = uuid();
		this.type = type;
		this.size = size;
		this.position = position;
	}
}

class Circle extends Shape {
	constructor(size, position) {
		super("circle", size, position);
		this.radius = size;
	}
}

class Triangle extends Shape {
	constructor(size, position) {
		super("triangle", size, position);
		this.pointA = size.pointA;
		this.pointB = size.pointB;
		this.pointC = size.pointC;
	}
}

class Square extends Shape {
	constructor(size, position) {
		super("square", size, position);
		this.pointA = size.pointA;
		this.pointB = size.pointB;
		this.pointC = size.pointC;
		this.pointD = size.pointD;
	}
}

class Rectangle extends Shape {
	constructor(size, position) {
		super("rectangle", size, position);
		this.pointA = size.pointA;
		this.pointB = size.pointB;
		this.pointC = size.pointC;
		this.pointD = size.pointD;
	}
}

app.get("/", (req, res) => {
	res.send("Welcome to the diagram API");
});

//create new diagram
app.get("/createDiagram", (req, res) => {
	const newDiagram = new Diagram();
	diagrams.push(newDiagram);
	res.send(newDiagram);
});

//get all diagrams
app.get("/diagrams", (req, res) => {
	res.send(diagrams);
});

//get diagram by id
app.get("/diagrams/:diagramId", (req, res) => {
	const diagramId = req.params.diagramId;
	const diagram = diagrams.find((diagram) => diagram.diagramId === diagramId);
	res.send(diagram);
});




app.listen(PORT || 3000, () => {
	console.log(`Server running on port ${PORT}`);
});
