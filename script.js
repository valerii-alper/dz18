const roles = {
	admin: "https://cdn-icons-png.flaticon.com/512/1424/1424453.png",
	student: "https://cdn-icons-png.flaticon.com/512/1424/1424424.png",
	lector: "https://cdn-icons-png.flaticon.com/512/1424/1424450.png"
};

const gradation = {
	20: "satisfactory",
	55: "good",
	85: "very-good",
	100: "excellent"
};

const users = [
	{
		name: "Jack Smith",
		age: 23,
		img: "https://cdn-icons-png.flaticon.com/512/2922/2922522.png",
		role: "student",
		courses: [
			{
				"title": "Front-end Pro",
				"mark": 20
			},
			{
				"title": "Java Enterprise",
				"mark": 100
			}
		]
	},
	{
		name: "Amal Smith",
		age: 20,
		img: "https://cdn-icons-png.flaticon.com/512/2922/2922656.png",
		role: "student"
	},
	{
		name: "Noah Smith",
		age: 43,
		img: "https://cdn-icons-png.flaticon.com/512/2922/2922661.png",
		role: "student",
		courses: [
			{
				"title": "Front-end Pro",
				"mark": 50
			}
		]
	},
	{
		name: "Charlie Smith",
		age: 18,
		img: "https://cdn-icons-png.flaticon.com/512/2922/2922688.png",
		role: "student",
		courses: [
			{
				"title": "Front-end Pro",
				"mark": 75
			},
			{
				"title": "Java Enterprise",
				"mark": 23
			}]
	},
	{
		name: "Emily Smith",
		age: 30,
		img: "https://cdn-icons-png.flaticon.com/512/2922/2922565.png",
		role: "admin",
		courses: [
			{
				"title": "Front-end Pro",
				"score": 10,
				"lector": "Leo Smith"
			},
			{
				"title": "Java Enterprise",
				"score": 50,
				"lector": "David Smith"
			},
			{
				"title": "QA",
				"score": 75,
				"lector": "Emilie Smith"
			}]
	},
	{
		name: "Leo Smith",
		age: 253,
		img: "https://cdn-icons-png.flaticon.com/512/2922/2922719.png",
		role: "lector",
		courses: [
			{
				"title": "Front-end Pro",
				"score": 78,
				"studentsScore": 79
			},
			{
				"title": "Java Enterprise",
				"score": 85,
				"studentsScore": 85
			}
		]
	}
]



function getGradation (score) {
	for(key in gradation) {
		if(score <= key) return score = gradation[key];
	}
}





class User {
	constructor(name, age, img, role, courses){
		this.name = name,
		this.age = age,
		this.img = img,
		this.role = role,
		this.courses = courses
	}

	render() {
		let infoNode = []
		infoNode.push(`
		<div class="user__info">
		<div class="user__info--data">
			<img src="${this.img}" alt="${this.name}" height="50">
			<div class="user__naming">
				<p>Name: <b>${this.name}</b></p>
				<p>Age: <b>${this.age}</b></p>
			</div>
		</div>
			<div class="user__info--role ${this.role}">
				<img src="${roles[this.role]}" alt="${roles[this.role]}" height="25">
				<p>${this.role}</p>
			</div>
		</div>
	`)
	return infoNode.join("")
	}
	
}


class Student extends User {
	constructor(name, age, img, role, courses) {
		super(name, age, img, role, courses)
	}

	renderCourses() {
		if(this.courses !== undefined) {
			let coursesNode = [];
			this.courses.forEach((course) => {
				coursesNode.push(`
					<p class="user__courses--course ${this.role}">
						${course.title} <span class="${getGradation(course.mark).toLowerCase()}">${getGradation(course.mark)}</span>
					</p>
			`)
			})
		return coursesNode.join("")
		} else {
			return 'no-courses'
		}
	}
}

class Lector extends User {
	constructor(name, age, img, role, courses) {
		super(name, age, img, role, courses)
	}

	renderCourses() {
		if(this.courses !== undefined) {
			let coursesNode = [];
			this.courses.forEach((course) => {
				coursesNode.push(`
					<div class="user__courses--course lector">
						<p>Title: <b>${course.title}</b></p>
						<p>Lector's score: <span class="${getGradation(course.score).toLowerCase()}">${getGradation(course.score)}</span></p>
						<p>Average student's score: <span class="${getGradation(course.studentsScore).toLowerCase()}">${getGradation(course.studentsScore)}</span></p>
					</div>
			`)
			})
		return coursesNode.join("")
		}else {
			return 'no-courses'
		}
	}
}


class Admin extends User {
	constructor(name, age, img, role, courses) {
		super(name, age, img, role, courses)
	}

	renderCourses() {
		if(this.courses !== undefined) {
			let coursesNode = [];
			this.courses.forEach((course) => {
				coursesNode.push(`
					<div class="user__courses--course admin">
						<p>Title: <b>${course.title}</b></p>
						<p>Admin's score: <span class="${getGradation(course.score).toLowerCase()}">${getGradation(course.score)}</span></p>
					<p>Lector: <b>${course.lector}</b></p>
					</div>
			`)
			})
		return coursesNode.join("")
		}else {
			return 'no-courses'
		}
	}
}



let usersMarkup = users.map((user) => {
	let usersNode = [];
	if (user.role === 'admin') {
			let newUser = new Admin(user.name, user.age, user.img, user.role,user.courses);
			usersNode.push(
                `<div class="user">${newUser.render()}<div class="user__courses admin--info">${newUser.renderCourses()}</div></div>`
            )
		}
	else if(user.role === 'student') {
		let newUser =  new Student(user.name, user.age, user.img, user.role,user.courses);
		usersNode.push(
			`<div class="user">${newUser.render()}<div class="user__courses">${newUser.renderCourses()}</div></div>`
		)
	} else if(user.role === 'lector') {
		let newUser =  new Lector(user.name, user.age, user.img, user.role,user.courses);
		usersNode.push(
			`<div class="user">${newUser.render()}<div class="user__courses admin--info"> ${newUser.renderCourses()}</div></div>`
		)
	}
	return usersNode
})

document.write(`<div class="users">${usersMarkup.join("")}</div>`)
  
  


