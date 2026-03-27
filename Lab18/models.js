const Sequelize = require('sequelize');
const Model = Sequelize.Model;

// ОПРЕДЕЛЯЕМ КЛАССЫ-МОДЕЛИ
class Faculty extends Model{};
class Pulpit extends Model{};
class Teacher extends Model{};
class Subject extends Model{};
class Auditorium_type extends Model{};
class Auditorium extends Model{};

// Функция для инициализации моделей
function internalORM(sequelize){
    
    // МОДЕЛЬ FACULTY (факультеты)
    Faculty.init(
        {
            faculty: {type: Sequelize.STRING, allowNull: false, primaryKey: true},
            faculty_name: {type: Sequelize.STRING, allowNull: false}
        },
        {sequelize, modelName: 'Faculty', tableName: 'Faculty', timestamps: false}
    );
    
    // МОДЕЛЬ PULPIT (кафедры)
    Pulpit.init(
        {
            pulpit: {type: Sequelize.STRING, allowNull: false, primaryKey: true},
            pulpit_name: {type: Sequelize.STRING, allowNull: false},
            faculty: {type: Sequelize.STRING, allowNull: false}
        },
        {sequelize, modelName: 'Pulpit', tableName: 'Pulpit', timestamps: false}
    );
    
    // МОДЕЛЬ TEACHER (преподаватели)
    Teacher.init(
        {
            teacher: {type: Sequelize.STRING, allowNull: false, primaryKey: true},
            teacher_name: {type: Sequelize.STRING, allowNull: false},
            pulpit: {type: Sequelize.STRING, allowNull: false}
        },
        {sequelize, modelName: 'Teacher', tableName: 'Teacher', timestamps: false}
    );
    
    // МОДЕЛЬ SUBJECT (предметы)
    Subject.init(
        {
            subject: {type: Sequelize.STRING, allowNull: false, primaryKey: true},
            subject_name: {type: Sequelize.STRING, allowNull: false},
            pulpit: {type: Sequelize.STRING, allowNull: false}
        },
        {sequelize, modelName: 'Subject', tableName: 'Subject', timestamps: false}
    );
    
   
    Auditorium_type.init(
        {
            auditorium_type: {type: Sequelize.STRING, allowNull: false, primaryKey: true},
            auditorium_typename: {type: Sequelize.STRING, allowNull: false},
        },
        {sequelize, modelName: 'Auditorium_type', tableName: 'Auditorium_type', timestamps: false}
    );
    
    
    Auditorium.init(
        {
            auditorium: {type: Sequelize.STRING, allowNull: false, primaryKey: true},
            auditorium_name: {type: Sequelize.STRING, allowNull: false},
            auditorium_capacity: {type: Sequelize.INTEGER, allowNull: false},
            auditorium_type: {
                type: Sequelize.STRING, 
                allowNull: false,
                references: {model: Auditorium_type, key: 'auditorium_type'}
            },
        },
        {sequelize, modelName: 'Auditorium', tableName: 'Auditorium', timestamps: false}
    );

    
    Subject.belongsTo(Pulpit, {
        foreignKey: 'pulpit',   
        targetKey: 'pulpit'      
    });
    
    Pulpit.belongsTo(Faculty, {
        foreignKey: 'faculty',    
        targetKey: 'faculty'       
    });
    
    Teacher.belongsTo(Pulpit, {
        foreignKey: 'pulpit',
        targetKey: 'pulpit'
    });
    
    Auditorium.belongsTo(Auditorium_type, {
        foreignKey: 'auditorium_type',
        targetKey: 'auditorium_type'
    });

    Faculty.hasMany(Pulpit, {
        foreignKey: 'faculty',
        sourceKey: 'faculty'
    });
    
   
    Pulpit.hasMany(Subject, {
        foreignKey: 'pulpit',
        sourceKey: 'pulpit'
    });
    
    Pulpit.hasMany(Teacher, {
        foreignKey: 'pulpit',
        sourceKey: 'pulpit'
    });
    
    Auditorium_type.hasMany(Auditorium, {
        foreignKey: 'auditorium_type',
        sourceKey: 'auditorium_type'
    });
}

exports.ORM = (s) => {
    internalORM(s);
    return {Faculty, Pulpit, Teacher, Subject, Auditorium_type, Auditorium}
}