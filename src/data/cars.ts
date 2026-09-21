import type { ImageMetadata } from 'astro';

export type Categoria = 'esportivo' | 'classico' | 'suv' | 'eletrico';

export const categorias: { id: Categoria; label: string }[] = [
  { id: 'esportivo', label: 'Esportivo' },
  { id: 'classico', label: 'Clássico' },
  { id: 'suv', label: 'SUV' },
  { id: 'eletrico', label: 'Elétrico' },
];

export const categoriaLabel = Object.fromEntries(
  categorias.map((c) => [c.id, c.label]),
) as Record<Categoria, string>;

export interface Car {
  slug: string;
  nome: string;
  categorias: Categoria[];
  cor: string;
  ano: string;
  km: string;
  preco: string;
  cambio: string;
  combustivel: string;
  motor: string;
  descricao: string[];
  fotos: ImageMetadata[];
}

// As fotos ficam em src/assets/cars/<slug>/NN-nome.jpg; o prefixo NN define a ordem
// (a 01 é a foto principal).
const imagens = import.meta.glob<ImageMetadata>('/src/assets/cars/*/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
});

function fotosDe(slug: string): ImageMetadata[] {
  return Object.keys(imagens)
    .filter((p) => p.startsWith(`/src/assets/cars/${slug}/`))
    .sort()
    .map((p) => imagens[p]);
}

// Dados técnicos são placeholders: substitua pelos valores reais de cada anúncio.
const ficha = {
  ano: '[Ano]',
  km: '[KM]',
  preco: '[R$ Preço]',
  cambio: '[Câmbio]',
  combustivel: '[Combustível]',
  motor: '[Motor]',
};

const procedencia = '[Procedência, histórico de revisões e estado de conservação.]';

type CarInput = Omit<Car, 'fotos' | keyof typeof ficha> & Partial<typeof ficha>;

const lista: CarInput[] = [
  {
    slug: 'countach',
    nome: 'Lamborghini Countach',
    categorias: ['esportivo', 'classico'],
    cor: 'Preto',
    descricao: [
      'O desenho em cunha que virou pôster na parede de uma geração inteira. Linhas retas, portas em tesoura e uma presença que não pede licença.',
      procedencia,
    ],
  },
  {
    slug: 'miura',
    nome: 'Lamborghini Miura',
    categorias: ['classico', 'esportivo'],
    cor: 'Amarelo',
    descricao: [
      'Para muita gente, o carro que inventou o superesportivo de motor central. Curvas baixas, faróis com “cílios” e um amarelo que chama atenção de longe.',
      procedencia,
    ],
  },
  {
    slug: 'diablo',
    nome: 'Lamborghini Diablo',
    categorias: ['esportivo', 'classico'],
    cor: 'Branco',
    descricao: [
      'O sucessor do Countach, com a mesma atitude e formas mais fluidas. Em branco, cada vinco da carroceria aparece.',
      procedencia,
    ],
  },
  {
    slug: 'audi-r8',
    nome: 'Audi R8',
    categorias: ['esportivo'],
    cor: 'Cinza',
    descricao: [
      'Motor central, tração integral e uso fácil no dia a dia. Um esportivo que você dirige até a padaria sem sofrer.',
      procedencia,
    ],
  },
  {
    slug: 'mg-cyberster',
    nome: 'MG Cyberster',
    categorias: ['esportivo', 'eletrico'],
    cor: 'Vermelho',
    combustivel: 'Elétrico',
    descricao: [
      'Roadster elétrico com portas em tesoura e visual de conceito. Silencioso na cidade, dramático parado na calçada.',
      procedencia,
    ],
  },
  {
    slug: 'ford-custom-v8',
    nome: 'Ford Custom V8',
    categorias: ['classico'],
    cor: 'Verde',
    descricao: [
      'Sedã americano de época com muito cromo, pneus faixa branca e aquele verde que não se fabrica mais.',
      procedencia,
    ],
  },
  {
    slug: 'fusca-conversivel',
    nome: 'VW Fusca Conversível',
    categorias: ['classico'],
    cor: 'Azul e creme',
    descricao: [
      'O Fusca de sempre, agora sem teto. Pintura em dois tons e interior claro para passeios de fim de semana.',
      procedencia,
    ],
  },
  {
    slug: 'ford-f100',
    nome: 'Ford F-100',
    categorias: ['classico'],
    cor: 'Laranja e prata',
    descricao: [
      'Picape clássica com pintura em dois tons e grade marcante. Serve de carro de coleção e também de companheira de estrada.',
      procedencia,
    ],
  },
  {
    slug: 'golf-harlequin',
    nome: 'VW Golf Harlequin',
    categorias: ['classico'],
    cor: 'Multicolor',
    descricao: [
      'Cada painel de uma cor: o Golf mais divertido já feito. Uma raridade que não passa despercebida em nenhum estacionamento.',
      procedencia,
    ],
  },
  {
    slug: 'jetour-t2',
    nome: 'Jetour T2 4x4',
    categorias: ['suv'],
    cor: 'Cinza fosco',
    descricao: [
      'SUV de linhas quadradas, tração 4x4 e acabamento fosco. Pronto para a trilha e confortável no asfalto.',
      procedencia,
    ],
  },
  {
    slug: 'avatr-07',
    nome: 'Avatr 07',
    categorias: ['suv', 'eletrico'],
    cor: 'Verde',
    combustivel: 'Elétrico',
    descricao: [
      'SUV elétrico com cabine ampla, telas generosas e desenho limpo. Tecnologia de sobra sem abrir mão do espaço.',
      procedencia,
    ],
  },
  {
    slug: 'denza-z9gt',
    nome: 'Denza Z9 GT',
    categorias: ['eletrico'],
    cor: 'Azul',
    combustivel: 'Elétrico',
    descricao: [
      'Gran turismo elétrico de carroceria shooting brake. Elegante, espaçoso e feito para viagens longas.',
      procedencia,
    ],
  },
];

export const cars: Car[] = lista.map((c) => ({ ...ficha, ...c, fotos: fotosDe(c.slug) }));

export const carBySlug = (slug: string) => cars.find((c) => c.slug === slug);

export const destaques = ['miura', 'diablo', 'denza-z9gt'].map((s) => carBySlug(s)!);

/** Até `n` carros relacionados: primeiro os que dividem categoria, depois o restante. */
export function vejaTambem(car: Car, n = 4): Car[] {
  const outros = cars.filter((c) => c.slug !== car.slug);
  const score = (c: Car) => c.categorias.filter((k) => car.categorias.includes(k)).length;
  return [...outros].sort((a, b) => score(b) - score(a)).slice(0, n);
}
