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
    const [perguntas, setPerguntas] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [categoriasAll, setCategoriasAll] = useState([]);

    const [codigo_impresa, setCodigo_empresa] = useState('');
    const [codigo_categoria, setcodigo_categoria] = useState('');
    const [foto, setFoto] = useState(false);
    const [nomeCateg, setnomeCateg] = useState('');
    const [perguntaPT, setperguntaPT] = useState('');
    const [perguntaEN, setperguntaEN] = useState('');
    const [tituloPT, settituloPT] = useState('');
    const [tituloEN, settituloEN] = useState('');
    const [escrever, setescrever] = useState(true);
    const [assinalar, setassinalar] = useState(false);
    const [assinatura, setassinatura] = useState(false);
    const [ordem, setordem] = useState('');
    const [id, setId] = useState('');

    function escolher(params) {
        if (params === 'escrever') {
            setescrever(true)
            setassinalar(false)
            setassinatura(false)
        }
        else if (params === 'assinalar') {
            setescrever(false)
            setassinalar(true)
            setassinatura(false)
        }
        else if (params === 'assinar') {
            setescrever(false)
            setassinalar(false)
            setassinatura(true)
        } else {
            setescrever(false)
            setassinalar(false)
            setassinatura(false)
        }
    }


    function slecionarCategoria(params) {
        const codigo = categoriasAll.filter(c => (c.tituloPT === params));
        const codigoID = codigo.map(c => (c.id));
        const foto = codigo.map(c => (c.foto));
        if (foto.toString() === 'true') {
            setFoto(true)
            setescrever(false)
            setassinalar(false)
            setassinatura(false)
        } else {
            setFoto(false)
        }

        setcodigo_categoria(codigoID.toString());
        setnomeCateg(params);
    }
    const es = escrever.toString();
    const as = assinalar.toString();
    const ass = assinatura.toString();

    async function cadCategorias() {
        const options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            },
            data: {
                id_categoria: codigo_categoria, cd_impresa: codigo_impresa, perguntaPT, perguntaEN, assinalar: as, assinatura: ass, escrever: es, tituloPT, tituloEN, ordem
            },

            url: 'CriarPerguntas',
        };

        const res = await axios(options);
        if (res.data.length === 0) {

        } else {
            ListarCategorias();
            ListarPerguntas();
            setNovo(false);
        }
    };
    function namedacateg(params) {
        const codigo = categoriasAll.filter(c => (c.id.toString() === params));
        const codigoID = codigo.map(c => (c.tituloPT));
        return codigoID;
    }
    async function TrazerPerguntas() {
        const options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            },
            data: {
                id
            },
            url: 'GetOnePerguntas',
        };

        const res = await axios(options);
        if (res.data.length === 0) {

        } else {
            [res.data].map(r => (
                setnomeCateg(namedacateg(r.id_categoria).toString()),
                setperguntaEN(r.perguntaEN),
                setperguntaPT(r.perguntaPT),
                setescrever(r.escrever === 'true'?true:false),
                setassinalar(r.assinalar === 'true'?true:false),
                setassinatura(r.assinatura === 'true'?true:false),
                setFoto(r.escrever === 'false' && r.assinalar === 'false' && r.assinatura === 'false' ? true:false),
                settituloEN(r.tituloEN),
                settituloPT(r.tituloPT),
                setordem(r.ordem),
                setNovo(true)
            ));

        }

    };

    useEffect(() => {
        if (id !== '') {
            TrazerPerguntas();
        };
    }, [id]);

    useEffect(() => {
        if (novo === false) {

            setnomeCateg('')
            setperguntaEN('');
            setperguntaPT('');
            setescrever(true);
            setassinalar(false);
            setassinatura(false);
            setFoto(false);
            settituloEN('');
            settituloPT('');
            setordem('');

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
                id, id_categoria: codigo_categoria, perguntaPT, perguntaEN, assinalar: as, assinatura: ass, escrever: es, tituloPT, tituloEN, ordem

            },

            url: 'UpdatePerguntas',
        };
        const res = await axios(options);
        if (res.data.length === 0) {

        } else {
            ListarCategorias();
            ListarPerguntas()
            setNovo(false);
        }
    };

    async function ListarPerguntas() {
        const options = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            },
            data: {},
            url: 'ListarPerguntas',
        };
        const res = await axios(options);
        if (res.data.length === 0) {
            setPerguntas([]);
        } else {
            setPerguntas(res.data);
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
            setCategorias([]);
            setCategoriasAll([])

        } else {
            const dat = res.data;
            setCategoriasAll(dat)
            setCategorias(
                dat.map(r => (
                    { key: r.tituloPT, value: r.tituloPT, text: r.tituloPT }
                )))
        }
    };
    useEffect(() => {
        ListarCategorias();
        ListarPerguntas()
    }, []);


    async function ExcluirPergunta(params) {
        const options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            },
            data: { id: params },
            url: 'DeletarPerguntas',
        };
        const res = await axios(options);
        if (res.data.length === 0) {
            ListarCategorias();
            ListarPerguntas()
        } else {
            ListarCategorias();
            ListarPerguntas()
        }
    };

    function nomedaCategoria(params) {
        const nomes = categoriasAll.filter(c => (c.id.toString() === params));
        const nome = nomes.map(c => (c.tituloPT));
        return nome;
    }

    function Lista() {
        return (
            <>
                {perguntas.map(c => (
                    <Table.Row>
                        <Table.Cell> {nomedaCategoria(c.id_categoria)} </Table.Cell>
                        <Table.Cell> {c.perguntaPT} </Table.Cell>
                        <Table.Cell> {c.perguntaEN}  </Table.Cell>
                        <Table.Cell> {c.escrever === 'false' ? 'N??o' : 'Sim'}  </Table.Cell>
                        <Table.Cell> {c.assinalar === 'false' ? 'N??o' : 'Sim'}  </Table.Cell>
                        <Table.Cell> {c.assinatura === 'false' ? 'N??o' : 'Sim'}  </Table.Cell>
                        <Table.Cell> {c.tituloPT}  </Table.Cell>
                        <Table.Cell> {c.tituloEN}  </Table.Cell>
                        <Table.Cell> {c.ordem}  </Table.Cell>
                        <Table.Cell>
                            <Button.Group>
                                <Button onClick={() => setId(c.id)}>
                                    <Icon name="pencil" />
                                </Button>
                                <Button.Or text='ou' />
                                <Button onClick={() => ExcluirPergunta(c.id)} color='red'>
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
                    <Header>Lista de Perguntas   <Button onClick={() => setNovo(!novo)} color='green'>Nova Pergunta</Button></Header>
                    <Table compact celled>
                        <Table.Header fullWidth>
                            <Table.Row>
                                <Table.HeaderCell>Categoria</Table.HeaderCell>
                                <Table.HeaderCell>Pergunta em Portugues</Table.HeaderCell>
                                <Table.HeaderCell>Pergunta em Ingl??s</Table.HeaderCell>
                                <Table.HeaderCell>?? de Escrever ?</Table.HeaderCell>
                                <Table.HeaderCell>?? de Assinalar ? </Table.HeaderCell>
                                <Table.HeaderCell>?? uma Assinatura ? </Table.HeaderCell>
                                <Table.HeaderCell>Subtitulo em Portugues/Op????es em Portugues </Table.HeaderCell>
                                <Table.HeaderCell>Subtitulo em Ingl??s/Op????es em Ingl??s </Table.HeaderCell>
                                <Table.HeaderCell>Ordem de Apresenta????o </Table.HeaderCell>
                                <Table.HeaderCell width={2}>A????es</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>{Lista()}</Table.Body>

                        <Table.Footer fullWidth>
                            <Table.Row>
                                <Table.HeaderCell colSpan={10} />
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
                                <label>Categoria da Pergunta</label>
                                <Dropdown
                                    placeholder='Categorias da Pergunta.'
                                    fluid
                                    search
                                    selection
                                    value={nomeCateg}
                                    onSearchChange={(e, { searchQuery }) => slecionarCategoria([searchQuery].toString())}
                                    onChange={(e, { value }) => slecionarCategoria([value].toString())}
                                    options={categorias}
                                />
                            </Form.Field>

                            <Form.Field>
                                <label>Ordem de Apresenta????o</label>
                                <Input
                                    type="number"
                                    onChange={(e, { value }) => setordem([value].toString())}
                                    value={ordem}
                                    placeholder="Ordem de apresenta????o."
                                    fluid
                                />
                            </Form.Field>

                        </Form.Group>

                        <Form.Group unstackable widths={2}>

                            <Form.Field>
                                <label>Pergunta em Portugues</label>
                                <Input
                                    type="text"
                                    onChange={(e, { value }) => setperguntaPT([value].toString())}
                                    value={perguntaPT}
                                    placeholder="Usu??rio."
                                    fluid
                                />
                            </Form.Field>

                            <Form.Field>
                                <label>Pergunta em Ingl??s</label>
                                <Input
                                    type="text"
                                    onChange={(e, { value }) => setperguntaEN([value].toString())}
                                    value={perguntaEN}
                                    placeholder="Usu??rio."
                                    fluid
                                />
                            </Form.Field>

                        </Form.Group>

                        <div style={{ alignItems: 'center', justifyContent: 'center', display: foto === false ? 'flex' : 'none' }}>
                            <Form.Group unstackable widths={2}>
                                <Form.Field>
                                    <label>?? de Escrever ?</label>
                                    <button onClick={() => escolher('escrever')} style={{ width: 150, backgroundColor: escrever === true ? 'green' : 'red', color: 'white' }} class="ui button">{escrever === true ? 'Sim' : 'N??o'}</button>
                                </Form.Field>

                                <Form.Field>
                                    <label>?? de Assinalar ?</label>
                                    <button onClick={() => escolher('assinalar')} style={{ width: 150, backgroundColor: assinalar === true ? 'green' : 'red', color: 'white' }} class="ui button">{assinalar === true ? 'Sim' : 'N??o'}</button>
                                </Form.Field>

                                <Form.Field>
                                    <label>?? uma Assinatura ?</label>
                                    <button onClick={() => escolher('assinar')} style={{ width: 150, backgroundColor: assinatura === true ? 'green' : 'red', color: 'white' }} class="ui button">{assinatura === true ? 'Sim' : 'N??o'}</button>
                                </Form.Field>

                            </Form.Group>
                        </div>

                        <Form.Group unstackable widths={2}>

                            <Form.Field>
                                <label>{assinalar === true ? 'Op????es em Portugues' : 'Subtitulo em Portugues'}</label>
                                <Input
                                    type="text"
                                    onChange={(e, { value }) => settituloPT([value].toString())}
                                    value={tituloPT}
                                    placeholder={assinalar === true ? 'Ex: Sim, N??o' : 'Qual o Documento do Motorista'}
                                    fluid
                                />
                            </Form.Field>

                            <Form.Field>
                                <label>{assinalar === true ? 'Op????es em Ingl??s' : 'Subtitulo em Ingl??s'}</label>
                                <Input
                                    type="text"
                                    onChange={(e, { value }) => settituloEN([value].toString())}
                                    value={tituloEN}
                                    placeholder={assinalar === true ? 'Ex: Yes, No' : 'What is the Driver"s Document?'}
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