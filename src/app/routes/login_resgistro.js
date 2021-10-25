//rutas para todas las vistas de la aplicación
const { createConnection } = require('mysql');
const express= require('express');
const cors= require('cors');
const formidable= require('express-formidable');
const bcryptjs = require('bcryptjs');
const myconn=require('express-myconnection');
const app = require('../../config/server');
const connection = require('../../config/db');


module.exports = app => { 
    //---------------------------------------
    //Metodos POST 
    // Metodo  post en el index para login para autenticacion 
    app.post('/auth', async (req, res) => {
        const { username, password } = req.body;
        let passwordHaash = await bcryptjs.hash(password, 8);
        console.log(req.body); //se imprime en consola la cosnt 
        if (username  && password) {
            connec.query('SELECT * FROM roles WHERE username=?, password=?', [username,password], async (err, rows) => {
                console.log(results); 
                if (results.length === 0 || !(await bcryptjs.compare(password, results[0].password))) {
                } else {
                    req.session.loggedin = true;
                    req.session.name = results[0].username;
                    req.session.id = results[0].id;
                    console.log(results[0].id)               // sesiones de usuario para saber si esta logueado
                    if (roles === 'admin@admin.com') {
                        req.session.roles = 'admin@admin.com'
                        res.json(rows);
                        res.redirect('/login')
                        /login
                        res.end()
                    } 
                }
            })
        }
    });
    // Metodo para listar usuario en sistema
    app.get('/user', (req, res) => {
        connec.query("SELECT * FROM usuario", (err, rows) => {
            res.json(rows)
        });
    });
    //listar compañias
    app.get('/company', (req, res) => {
        connec.query("SELECT * FROM company", (err, rows) => {
            res.json(rows)
        });
    });
    //Agregar company a la BD
    app.post('/addcompany', (req, res) => {
        const { name, email, logo, website, company_id } = req.body;
        connec.query("INSERT INTO company SET?", {
            name: name,
            email: email,
            logo: logo,
            website: website,
            company_id: company_id
        }, (err, rows) => {
            if (err) {
                res.send(err);
            } else {
                res.send("agrada")
            }
        })
    });
    //eliminar company
    app.get('/removecompany/:id', (req, res) => {
        const id = req.params.id;
        connec.query("DELETE FROM company WHERE id=?", [id], (err, rows) => {
            if (err) {
                res.send(err);
            } else {
                res.send("Eliminado")
            }
        })
    });
    //editar company
    app.post('/editcompany/:id', (req, res) => {
        const id = req.params.id;
        const {name ,email,logo,website, company_id} = req.body;
        connec.query("UPDATE company SET name=?, email=?, logo=?,website=? WHERE id=?",
            [name, email,logo,website], (err, rows) => {
                    if (err) {
                        res.send(err)
                    } else {
                        res.send("Editada")
                    }
                })
    });

    /* solicitud metodo get para mostrar  un empleados de la bd*/
    app.get('/employee', (req, res) => {
        connec.query("SELECT * FROM empleados", (err, rows) => {
            res.json(rows)
        });
    });
    // solicitud para insertar empleado a la bd
    app.post('/addEmployee', (req, res) => {
        const { first_name ,last_name} = req.body;
        console.log(req.body);
        connec.query("INSERT INTO empleados SET?", {
            first_name: first_name,
            last_name: last_name,
        }, async (error, rows) => {
            if (error) {
                console.log(error);
                res.send('empleado agregado')
            } 
        })
    });
    // solicitud para borrar de la base de datos un  de la base de datos 
    app.get('/deleteEmployee/:id', (req, res) => {
        connec.query("DELETE FROM empleados WHERE id=?", [req.params.id], (err, rows) => {
            if (err) {
                res.send(err);
            } else {
                res.send("Eliminado")
            }
        })
    });
    app.post('/editEmployee/:id', (req, res) => {
        const id = req.params.id;
        const {first_name ,last_name} = req.body;
        connec.query("UPDATE empleados SET first_name=?, last_name=? WHERE id=?",
            [first_name, last_name,id], (err, rows) => {
                    if (err) {
                        res.send(err)
                    } else {
                        res.send("Editado")
                    }
                })
    });

}




