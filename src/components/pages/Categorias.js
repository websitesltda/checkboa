import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import 'semantic-ui-css/semantic.min.css'

import {
    Button,
    Form,
    Header,
    Icon,
    Input,
    Dropdown,
    Segment,
    Table
} from "semantic-ui-react";
import axios from "axios";

export default function Categoria() {

    const [novo, setNovo] = useState(false);
    const [categorias, setcategorias] = useState([]);

    const [codigo_impresa, setCodigo_empresa] = useState('');
    const [tituloPT, settituloPT] = useState('');
    const [tituloEN, settituloEN] = useState('');
    const [foto, setfoto] = useState(false);
    const [ordem, setordem] = useState('');
    const [id, setId] = useState('');
    const fot = foto.toString()

    async function cadCategorias() {
        const options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            },
            data: {
                cd_impresa: codigo_impresa, tituloPT, tituloEN, foto: fot, ordem
            },

            url: 'CriarCategorias',
        };
        const res = await axios(options);
        if (res.data.length === 0) {

        } else {
            ListarCategorias();
            setNovo(false);
        }
    };

    async function TrazerCategorias() {
        const options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            },
            data: {
                id
            },
            url: 'GetOneCategorias',
        };

        const res = await axios(options);
        if (res.data.length === 0) {

        } else {
            [res.data].map(r => (
                settituloEN(r.tituloEN),
                settituloPT(r.tituloPT),
                setfoto(r.foto === 'false' ? false : true),
                setordem(r.ordem),
                setNovo(true)
            ));

        }

    };

    useEffect(() => {
        if (id !== '') {
            TrazerCategorias();
        };
    }, [id]);

    useEffect(() => {
        if (novo === false) {
            settituloEN('');
            settituloPT('');
            setfoto(false);
            setId('');
            setordem('')

            setCodigo_empresa(parseInt(Math.random() * (999999 - 100000) + 100000))

        };
    }, [novo]);

    async function UpdCategoria() {
        const options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            },
            data: {
                id, tituloPT, tituloEN, foto: fot, ordem

            },

            url: 'UpdateCategorias',
        };
        const res = await axios(options);
        if (res.data.length === 0) {

        } else {
            ListarCategorias();
            setNovo(false);
        }
    };

    async function ListarCategorias() {
        const options = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            },
            data: {},
            url: 'ListarCategorias',
        };
        const res = await axios(options);
        if (res.data.length === 0) {
            setcategorias([]);
        } else {
            setcategorias(res.data);
        }
    };
    useEffect(() => {
        ListarCategorias();
    }, []);

    async function ExcluirCategoria(params) {
        const options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            },
            data: { id: params },
            url: 'DeletarCategorias',
        };
        const res = await axios(options);
        if (res.data.length === 0) {
            ListarCategorias();
        } else {
            ListarCategorias();
        }
    };

    function Lista() {
        return (
            <>
                {categorias.map(c => (
                    <Table.Row>
                        <Table.Cell> {c.id} </Table.Cell>
                        <Table.Cell> {c.tituloPT} </Table.Cell>
                        <Table.Cell> {c.tituloEN}  </Table.Cell>
                        <Table.Cell> {c.foto === 'false' ? 'Não' : 'Sim'}  </Table.Cell>
                        <Table.Cell> {c.ordem}  </Table.Cell>
                        <Table.Cell>
                            <Button.Group>
                                <Button onClick={() => setId(c.id)}>
                                    <Icon name="pencil" />
                                </Button>
                                <Button.Or text='ou' />
                                <Button onClick={() => ExcluirCategoria(c.id)} color='red'>
                                    <Icon name="delete" />
                                </Button>
                            </Button.Group>

                        </Table.Cell>
                    </Table.Row>
                ))}
            </>
        )
    };

    return (

        <>

            {novo === false ?
                <Segment>
                    <Header>Lista de Categorias   <Button onClick={() => setNovo(!novo)} color='green'>Nova Categoria</Button></Header>
                    <Table compact celled>
                        <Table.Header fullWidth>
                            <Table.Row>
                                <Table.HeaderCell>Código da Categoria</Table.HeaderCell>
                                <Table.HeaderCell>Titulo em Portugues</Table.HeaderCell>
                                <Table.HeaderCell>Titulo em Inglês</Table.HeaderCell>
                                <Table.HeaderCell>É Foto ?</Table.HeaderCell>
                                <Table.HeaderCell>Ordem </Table.HeaderCell>
                                <Table.HeaderCell width={2}>Ações</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>{Lista()}</Table.Body>

                        <Table.Footer fullWidth>
                            <Table.Row>
                                <Table.HeaderCell colSpan={6} />
                            </Table.Row>
                        </Table.Footer>
                    </Table>
                </Segment>

                : null}


            {novo === true ?
                <Segment>
                    <Form>
                        <Form.Group unstackable widths={2}>

                            <Form.Field>
                                <label>Categoria em Portugues</label>
                                <Input
                                    type="text"
                                    onChange={(e, { value }) => settituloPT([value].toString())}
                                    value={tituloPT}
                                    placeholder="Categoria em Portugues"
                                />
                            </Form.Field>

                            <Form.Field>
                                <label>Categoria em Inglês</label>
                                <Input
                                    type="text"
                                    onChange={(e, { value }) => settituloEN([value].toString())}
                                    value={tituloEN}
                                    placeholder="Categoria em Inglês"
                                />
                            </Form.Field>
                        </Form.Group>

                        <Form.Group unstackable widths={2}>
                            <Form.Field>
                                <label>È Foto ?</label>
                                <button onClick={() => setfoto(!foto)} style={{ width: 150, backgroundColor: foto === true ? 'green' : 'red', color: 'white' }} class="ui button">{foto === true ? 'Sim' : 'Não'}</button>
                            </Form.Field>
                            <Form.Field>
                                <label>Ordem de Apresentação</label>
                                <Input
                                    type="text"
                                    onChange={(e, { value }) => setordem([value].toString())}
                                    value={ordem}
                                    placeholder="Usuário."
                                    fluid
                                />
                            </Form.Field>
                        </Form.Group>


                        <Button onClick={() => id !== '' ? UpdCategoria() : cadCategorias()} primary type="submit" >
                            {id !== '' ? 'Editar' : 'Salvar'}
                        </Button>
                        <Button onClick={() => setNovo(!novo)}>Cancelar</Button>
                    </Form>
                </Segment>
                : null}
        </>

    );

};