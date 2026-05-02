# **Arquitetura de Sistemas de Inteligência Artificial: Integração de APIs de Custo Zero e Otimização Estruturada de Prompts para Aplicações de SEO**

A ascensão dos Modelos de Linguagem de Grande Escala (Large Language Models \- LLMs) catalisou uma redefinição profunda nas fronteiras do Processamento de Linguagem Natural (PLN) e da engenharia de software.1 Historicamente, a interação humano-computador era governada por linguagens de programação de baixo e alto nível, exigindo sintaxes rígidas e determinísticas. Com o advento de arquiteturas transformadoras pré-treinadas em vastos corpora de dados, a linguagem natural humana ascendeu à posição de interface primária de compilação.1 A eficácia destes modelos estocásticos, entretanto, não é determinada exclusivamente por sua arquitetura subjacente, mas intrinsecamente pela forma como são integrados em infraestruturas de rede e como são instruídos via engenharia estruturada de contexto.1

O ecossistema contemporâneo de desenvolvimento permite que sistemas complexos de automação sejam prototipados e validados sem a necessidade de capital intensivo inicial, aproveitando as camadas gratuitas (Free Tiers) oferecidas por provedores de modelos de fundação. A presente análise exaustiva delineia a arquitetura técnica, as topologias de integração de Interface de Programação de Aplicações (API) do Google Gemini, DeepSeek e Groq no nível gratuito, e a aplicação prática de frameworks corporativos de engenharia de prompts. O objetivo analítico culmina na especificação de uma aplicação web de otimização de Search Engine Results Page (SERP) de alto desempenho, dotada de recursos visuais baseados no design do iOS 17 e concebida através de compilação autônoma (IDE Cursor).

## **1\. Análise da Infraestrutura de APIs Gratuitas e Limites Estocásticos (2026)**

Para que uma infraestrutura de inteligência artificial opere com sucesso sem a injeção de capital, é imperativo mapear com exatidão a matemática limitante dos fornecedores. Os parâmetros de gratuidade evoluem drasticamente, e a dependência de plataformas que aboliram seus níveis gratuitos (como a OpenAI) deve ser substituída por arquiteturas mais abertas. Os limites são classificados matematicamente em três matrizes de estrangulamento primárias: Requisições por Minuto (RPM), Tokens por Minuto (TPM) e Requisições por Dia (RPD).

### **1.1. O Ecossistema Google Gemini (AI Studio)**

O Google oferece um ambiente de experimentação contínua através do AI Studio. É crucial notar que os limites de gratuidade não são atrelados a chaves individuais, mas compartilham uma mesma "cesta de cota" (quota bucket) no nível do projeto do Google Cloud.9

A alocação empírica do nível gratuito atualizada para os modelos viáveis em 2026 é disposta a seguir:

| Modelo (Google Gemini) | Limite de Requisições (RPM) | Tokens por Minuto (TPM) | Requisições por Dia (RPD) | Considerações Arquiteturais |
| :---- | :---- | :---- | :---- | :---- |
| **Gemini 2.5 Flash-Lite** | 30 | 1.000.000 | 1.000 | A opção mais robusta para alto tráfego sem custo financeiro, ideal para prototipagem densa e processamento de grandes volumes de texto (como planilhas CSV para SEO).10 |
| **Gemini 2.5 Flash** | 10 | 250.000 | 250 | O modelo de uso geral padrão no nível gratuito. Permite a experimentação com vastas janelas de contexto, porém com estrangulamento temporal rigoroso.10 |
| **Gemini 1.5 Pro** | 2 | 50.000 | \- | Retido residualmente no nível gratuito com um limite severamente restritivo, tornando-o inviável para aplicações de produção que exigem iterações contínuas.10 |

Uma implicação contratual e de privacidade inalienável da camada gratuita do Gemini API é que as requisições enviadas e os dados de entrada (prompts) **são compulsoriamente utilizados pelo Google para o treinamento contínuo e aprimoramento de seus próprios produtos**.2 O uso de informações corporativas proprietárias ou segredos industriais está estritamente contraindicado neste nível de operação.2

### **1.2. O Paradigma de Integração do DeepSeek API**

A plataforma DeepSeek emergiu como uma das alternativas mais viáveis para o processamento estocástico de custo zero, adotando uma postura extremamente agressiva de captação de desenvolvedores.

* **Concessão de Tokens:** Novas contas recebem automaticamente 5 milhões de tokens gratuitos.  
* **Limites de Requisição (Rate Limits):** Ao contrário de ecossistemas engessados, a API do DeepSeek não possui limites de requisições por minuto (RPM) aplicados (No enforced rate limits). Eles processam as requisições baseando-se na disponibilidade da rede.  
* **Modelos e Eficiência:** O acesso gratuito cobre as arquiteturas de ponta, como o DeepSeek V3 e o DeepSeek R1. O grande trunfo arquitetônico do DeepSeek é a sua compatibilidade absoluta com o formato da OpenAI, facilitando transições de código sem refatorações massivas.

### **1.3. O Ecossistema de Ultra-Velocidade Groq Cloud**

O Groq diferencia-se por não focar em modelos proprietários, mas sim na hospedagem de modelos de código aberto (Open Source) em um hardware proprietário extremamente rápido (Language Processing Units \- LPUs).

* **Barreira de Entrada:** O Groq oferece um nível gratuito generoso que dispensa totalmente a inserção de cartão de crédito.  
* **Modelos Suportados:** Fornece acesso direto a modelos avançados como Llama 3.3 70B, Mixtral, e Gemma.  
* **Limites Operacionais:** Para modelos robustos como o Llama 3.3 70B, o Groq permite impressionantes 30 Requisições por Minuto (RPM) e um teto massivo de 14.400 Requisições por Dia (RPD) na sua camada sem custo. Assim como o DeepSeek, ele emula a API da OpenAI perfeitamente.

## **2\. Isolamento Criptográfico e Segurança de Variáveis de Ambiente**

O primeiro passo para o estabelecimento de uma conexão segura entre uma infraestrutura de aplicação e as APIs dos LLMs reside na extração e blindagem estrita das credenciais de acesso. O vazamento de chaves de API em repositórios públicos de controle de versão (como Git) ou a exposição destas strings no lado do cliente (navegador web) resulta na interrupção imediata dos serviços.

A engenharia de software postula que todas as chamadas a provedores de modelos fundacionais devem ocorrer em camadas de execução restritas ao servidor (Backend ou Serverless Functions). O encapsulamento lógico das chaves é realizado universalmente através de Variáveis de Ambiente.

Em frameworks de desenvolvimento de aplicações full-stack em 2026, como o **TanStack Start**, que integra roteamento avançado e renderização híbrida baseada no Vite, o gerenciamento de variáveis de ambiente possui demarcações de segurança inflexíveis. O arquivo .env (que deve ser rigorosamente listado no arquivo .gitignore) deve ser estruturado da seguinte forma:

Plaintext

\#.env (NUNCA COMMITE ESTE ARQUIVO)  
GEMINI\_API\_KEY="AIzaSy..."  
DEEPSEEK\_API\_KEY="sk-..."  
GROQ\_API\_KEY="gsk\_..."

O acesso programático a essas chaves ocorrerá unicamente sob a invocação do objeto global process.env dentro de funções isoladas e compiladas exclusivamente para o runtime do servidor.

## **3\. Implementação Programática e Arquitetura de Comunicação (TypeScript)**

Com as variáveis ambientais retidas em áreas seguras, procede-se ao acoplamento sintático. A prática de enviar requisições de rede manuais (Raw HTTP via fetch ou curl) não é recomendada. Os SDKs nativos abstraem negociações complexas de multiplexação, tipagem estruturada estrita (TypeScript types inference) e análise de fluxo iterativo.

### **3.1. Orquestração da Integração do Google Gemini**

A biblioteca contemporânea exigida pela Google opera sob a nomenclatura @google/genai.11

A instalação no ambiente Node.js procede pelo gerenciador de pacotes da preferência da equipe de arquitetura:

Bash

npm install @google/genai dotenv

A estrutura de chamada invoca a classe cliente GoogleGenAI. Quando o construtor é inicializado, o SDK inspeciona internamente as variáveis de ambiente, detectando e absorvendo a presença de GEMINI\_API\_KEY de modo implícito.12 O bloco subjacente foca na utilização do modelo rápido gemini-2.5-flash-lite, recomendado para iterações gratuitas pesadas.10

TypeScript

// utils/gemini-client.ts  
import { GoogleGenAI } from "@google/genai";

// A injeção automática captura process.env.GEMINI\_API\_KEY  
const ai \= new GoogleGenAI({});

export async function optimizeSerpWithGemini(prompt: string, data: string): Promise\<string\> {  
  try {  
    const response \= await ai.models.generateContent({  
      model: "gemini-2.5-flash-lite", // 30 RPM e 1.000 RPD no Free Tier  
      contents: \`${prompt}\\n\\nDados: ${data}\`  
    });  
      
    if (\!response.text) {  
        throw new Error("A decodificação resultou em matriz nula.");  
    }  
      
    return response.text;  
  } catch (error) {  
    console.error("Falha na interface Gemini:", error);  
    throw error;  
  }  
}

### **3.2. Orquestração da Integração de DeepSeek e Groq (Compatibilidade OpenAI)**

O aspecto mais engenhoso do desenvolvimento de IA moderno é que não precisamos aprender bibliotecas novas para cada fornecedor de código aberto. Tanto o DeepSeek quanto o Groq são **OpenAI-Compatible**. Isso significa que usaremos a biblioteca oficial da OpenAI, mas faremos um "sequestro de rota", alterando a URL base e a chave enviada.

A instalação exige a incorporação do módulo central da OpenAI:

Bash

npm install openai

A orquestração do código permite que você alterne dinamicamente entre DeepSeek e Groq apenas mudando dois parâmetros em tempo de execução:

TypeScript

// utils/universal-llm-client.ts  
import OpenAI from "openai";

// Função genérica que aceita o provider desejado  
export async function optimizeSerpWithUniversalLLM(  
  provider: "deepseek" | "groq",   
  systemPrompt: string,   
  userData: string  
): Promise\<string\> {  
    
  // Configuração Dinâmica baseada no Provider  
  let apiKey \= "";  
  let baseURL \= "";  
  let targetModel \= "";

  if (provider \=== "deepseek") {  
    apiKey \= process.env.DEEPSEEK\_API\_KEY\!;  
    baseURL \= "https://api.deepseek.com"; //  
    targetModel \= "deepseek-chat";  
  } else if (provider \=== "groq") {  
    apiKey \= process.env.GROQ\_API\_KEY\!;  
    baseURL \= "https://api.groq.com/openai/v1"; //  
    targetModel \= "llama-3.3-70b-versatile"; // Acesso robusto no Groq  
  }

  // Instanciando o cliente da OpenAI com a infraestrutura alternativa  
  const client \= new OpenAI({  
    apiKey: apiKey,  
    baseURL: baseURL  
  });

  try {  
    const response \= await client.chat.completions.create({  
      model: targetModel,  
      messages:,  
      temperature: 0.1, // Redução de entropia estocástica  
      max\_tokens: 800,  // Teto de proteção  
    });

    return response.choices.message.content |

| "";  
  } catch (error: any) {  
    if (error.status \=== 429) {  
       console.error("Quota excedida. Requisição estrangulada pelo servidor.");  
    }  
    throw error;  
  }  
}

### **3.3. Mitigação de Falhas e Resiliência Estruturada (Exponential Backoff)**

Ao operar em camadas gratuitas restritivas (como os 10 RPM do Gemini 2.5 Flash), a requisição frequentemente será interceptada no protocolo TCP/IP e devolvida instantaneamente com o código HTTP 429 Too Many Requests ou 429 RESOURCE\_EXHAUSTED.

Para evitar a interrupção crônica do serviço, a rotina de back-end deve implementar a técnica de mitigação denominada **Exponential Backoff com Jitter** (Recuo Exponencial com Fator de Dispersão Aleatória).4 Ao interceptar um erro 429, a thread de processamento suspende a requisição por um lapso inicial (por exemplo, 1000 milissegundos) e, subsequentemente, tenta invocar a predição da rede novamente. Se o estrangulamento for contínuo, a latência de suspensão é multiplicada por um coeficiente escalar, dilatando o tempo de espera até que o balanço da janela temporal no servidor remoto seja reiniciado.

### **3.4. O Paradigma do TanStack Start e as Server Functions**

Para construir a aplicação solicitada no ambiente de trabalho integrado (Cursor IDE), o stack moderno de desenvolvimento frequentemente invoca o **TanStack Start**. Este ecossistema resolve a dissociação entre front-end interativo e segurança de back-end ao oferecer *Server Functions* nativas baseadas em TypeScript inferido.6

Ao utilizar o decorador createServerFn(), o compilador Vite nativo do TanStack cria um invólucro do servidor isolado que permite que toda a complexidade do modelo de linguagem resida inteiramente longe do dispositivo do usuário.

TypeScript

// utils/server-actions.ts (Exemplo TanStack Start)  
import { createServerFn } from '@tanstack/react-start';  
import { z } from 'zod';  
import { optimizeSerpWithUniversalLLM } from './universal-llm-client';

// Validação em tempo de execução via Zod  
const SerpInputSchema \= z.object({  
  provider: z.enum(\["deepseek", "groq", "gemini"\]),  
  title: z.string(),  
  description: z.string(),  
  url: z.string().url(),  
  masterPrompt: z.string()  
});

export const optimizeSerpAction \= createServerFn({ method: 'POST' })  
.validator((data: unknown) \=\> SerpInputSchema.parse(data))  
.handler(async ({ data }) \=\> {  
    const systemInstruction \= data.masterPrompt;  
    const userDataBlock \= \`URL: ${data.url} \\nTitle: ${data.title} \\nDescription: ${data.description}\`;  
      
    // Invocação do cliente LLM (onde as API\_KEYS estão blindadas)  
    let result \= "";  
    if (data.provider \=== "gemini") {  
        // Chamada para a função Gemini detalhada no passo 3.1  
    } else {  
        result \= await optimizeSerpWithUniversalLLM(data.provider, systemInstruction, userDataBlock);  
    }  
      
    return { success: true, optimizedData: result };  
  });

## **4\. Estruturação Sistêmica e a Transição Epistemológica da Engenharia de Prompts**

A elaboração de chamadas aos modelos estocásticos não se fundamenta mais em heurísticas vernáculas ou comandos superficiais. Para alinhar o comportamento errático das redes neurais paramétricas à formatação exata exigida por rotinas computacionais em sistemas (por exemplo, exigindo que um metadado não ultrapasse 60 caracteres estritos), não basta expressar vontades; é imprescindível declarar matrizes sintáticas absolutas e restrições perimetrais negativas através de frameworks corporativos padronizados.

A regra canônica na elaboração prescreve que o LLM deve ser interpretado como uma engrenagem dotada de vasta base informacional subjacente, mas inteiramente isolada do contexto tácito da requisição do software.

### **4.1. Fundamentos da Modulação de Profundidade Cognitiva**

Os modelos auto-regressivos operam predizendo a distribuição probabilística da próxima sequência lógica (token a token). As diretrizes otimizadas exigem:

* **Delimitação Topográfica Inequívoca:** A utilização de tags estendidas, herdadas da formatação XML (como \<diretrizes\_comportamentais\>, \<contexto\_csv\> e \<formato\_de\_saida\_exigido\>), permite que o mecanismo interno de atenção da rede isole as premissas e categorize o que constitui lei de comportamento contra o que constitui dado empírico a ser manipulado.1  
* **Linguagem Positiva Restritiva:** Redes neurais autorregressivas processam a instrução afirmativa ("o que fazer") de forma computacionalmente mais rápido do que a negação ("o que não fazer"). Ao invés da matriz genérica "não ultrapasse o limite", a ancoragem determina a sintaxe "O campo deve conter inexoravelmente um valor situado entre 50 e 58 caracteres". Esta precisão marginaliza as divagações probabilísticas.1

### **4.2. Frameworks Corporativos de Arquitetura de Prompt**

Para extrair e formatar as premissas operacionais da aplicação desejada — um construtor massivo de otimizações de SERP operando em um painel interativo (Cursor App) — o Arquiteto de Prompts invoca a hibridização de duas matrizes proeminentes: o framework RISEN e o framework CO-STAR.

**Framework RISEN:** Aplicado estritamente à engenharia de software e compilação de código.1 Será utilizado para elaborar o "Prompt Mestre Primário" que o usuário fornecerá à Inteligência Artificial da IDE Cursor para gerar os componentes da aplicação.

**Framework CO-STAR:** O padrão ouro na construção de fluxos de trabalho de precisão.1 Será adotado como a espinha dorsal do "Prompt de Otimização", o núcleo lógico injetado em background nas Server Functions construídas.

## **5\. Estudo de Caso: Especificação Arquitetural e Geração do Aplicativo Otimizador de SERP**

O problema submetido ao Arquiteto de Prompts demanda a criação de uma infraestrutura que efetuará as extrações de SEO, devendo ser integralmente personalizável por usuários finais a partir de painéis visuais estilizados sob diretrizes contemporâneas de interface e experiência de usuário (UI/UX \- Padrão iOS 17).

A análise das exigências perimetrais revela os seguintes comportamentos obrigatórios para as lógicas de extração de SEO:

* A premissa deve processar planilhas tabulares injetadas (formato CSV) cujas colunas definem "URL", "Title" e "Meta Description".  
* Os resultados de predição do Title devem observar rigidamente o escopo probabilístico de até 60 caracteres, formulados sintaticamente sob a premissa de agregação estrita: \[Nome do Produto\] \+ \+.  
* A predição analítica destinada ao campo de Meta Description deve ser estrangulada matematicamente no escopo entre 140 e 148 caracteres.  
* O fluxo informacional das Descriptions deve incorporar imperativamente um "Call to Action" (CTA), alocado logo no prelúdio do campo através de verbos imperativos absolutos.

### **5.1 O Bloco Operacional Estruturado (O Prompt de Automação)**

A sintaxe a seguir configura o código de máquina estocástico formatado sob as normativas linguísticas rigorosas detalhadas anteriormente, destinado exclusivamente para a barra de compilação contextual (Composer) no ambiente da IDE Cursor.

### **DIRETRIZES DE ARQUITETURA PARA GERAÇÃO DA APLICAÇÃO (FRAMEWORK RISEN)**

O sistema deve conectar-se integralmente a chaves de API restritas via variáveis de ambiente seguras (com foco operacional nas sub-rotinas de IA sem custos como o Gemini, DeepSeek e Groq, conforme configurado na infraestrutura).

A interface visual final da compilação e todos os componentes interativos subjacentes devem obedecer com fidelidade cartesiana ao espectro de design sistêmico da topologia "Apple iOS 17": emprego massivo de "glassmorphism" elegante, painéis translúcidos baseados no backdrop-blur, cantos com border-radius agressivos e altamente arredondados.

\<end\_goal\>

O veredicto de compilação gerará as pastas e códigos essenciais que resultam em uma Single Page Application / SSR robusta e segura, provendo experiência fluída sem atrito e processamento iterativo infalível das matrizes estocásticas contra os serviços de nuvem providenciados.

\</end\_goal\>

\=== SEPARADOR SINTÁTICO DE GRAFOS DE FLUXO E LÓGICA DE MOTOR DE OTIMIZAÇÃO SEO \===

### **PROMPT MESTRE DE SISTEMA: OTIMIZAÇÃO SEO DE SERP (FRAMEWORK CO-STAR)**

*(Este é o Prompt base que o desenvolvedor deve preencher no botão visual de "Prompt Padrão" da interface da aplicação gerada para execução da extração literária, não para geração do código).*

Diretriz 1 (Meta Title Paramétrico):

* Exija obrigatoriamente a composição com limite estrito numérico máximo de 60 caracteres no processo final.  
* Construa a sintaxe unicamente na formulação estrutural predatória: \[Nome do Produto\] \+ \+. Exemplo de modelo: "ENERMAX: SUPLEMENTO MINERAL ADENSADO PARA BOVINOS DE CORTE".  
* Interrupção rigorosa: O modelo detém a ordem intransigente de NÃO eliciar menções formais em alusão ao nome restrito de "Marcas" no âmbito sintático deste elemento específico.

Diretriz 2 (Meta Description Estruturada):

* Proceda a elaboração matemática confinando o extrato num limite balizado intransponível estabelecido rigorosamente entre a margem estreita de 140 e 148 caracteres literais totais (englobando espaços em branco residuais).  
* Desencadeie o conteúdo imperativamente através da invocação de um verbo focado à ação explícita (Call-To-Action imperativo e atrativo) alocado exclusivamente como primeiro termo sentencial da oração (ex: "Conheça", "Explore", "Confira", "Descubra").  
* A formulação sintática terminal deve convergir o reforço analítico em campo semântico contextual, exaltando os diferenciais absolutos do produto contra anomalias concorrentes, priorizando tornar o constructo textual singular. Informações geopolíticas localizadas (SEO Local) são formalizadas somente se o campo base submetido detiver escopo restrito declarando necessidade.

\<response\_format\>

Processamento Lógico em Etapas Ocultas (Step-by-Step).

Para prevenir alucinação factualmente incorreta do corte das strings nos contadores lógicos:

Entregue exclusivamente um formato encapsulado em JSON contendo as duas chaves de resposta: "optimized\_title" e "optimized\_description". Exclua as matrizes de bloco oculto ou discursos adicionais ao usuário final do código do aplicativo em execução na geração terminal.

\</response\_format\>

## **6\. Configuração Preditiva, Hiperparâmetros e Validação Científica**

O processamento paramétrico detalhado da seção 5 não funcionará isolado do balanço intrínseco aos motores que serão disparados (Gemini Flash-Lite, DeepSeek-Chat, Llama-3-70B via Groq). O Arquiteto de Prompts, lidando com formatações rigorosas e limites computacionais estocásticos sensíveis, exige a regulação dos hiperparâmetros adjacentes durante o código de operação.1

A literatura acadêmica contemporânea em Processamento de Linguagem Natural estipula invariavelmente a mitigação severa da entropia geracional para as finalidades extraídas da especificação do sistema e que exijam conformidade matemática em sua estrutura léxica.

A modulação da diretriz conhecida como "Temperature" (Temperatura) atua nas matrizes internas modulando e achatando a distribuição de probabilidade da escolha sequencial dos próximos tokens preditos por redes autorregressivas.1 Devido à necessidade irrefutável de forçar contagens literais numéricas de strings e à formatação de extração de dados obrigatória em esqueleto fechado de JSON, a indicação imutável para a chamada na arquitetura construída é manter a Temperatura travada na mínima fração absoluta, idealmente prefigurada no valor de 0.0 a no máximo 0.1.1 Esta decodificação gulosa inviabiliza "alucinações criativas", mitigando que a IA gere tags de fechamento desconfiguradas que destruam os loops de execução no software.

## **7\. Conclusões Arquiteturais e Sistêmicas**

A migração de implementações heurísticas superficiais isoladas em terminais para infraestruturas autônomas guiadas paramétrica e programmaticamente comprova que as matrizes abstratas transitaram de meras interfaces conversacionais a robustos sistemas operacionais.

Sistemas corporativos operados sob restrições extremas de capital e custo marginais aproximados a zero — dominados pelas generosas alocações do **DeepSeek** (com seus 5 milhões de tokens iniciais e isenção de estrangulamento por minuto), a velocidade balística das LPUs do **Groq** (permitindo acesso nativo a pesados modelos open-source) ou as robustas transições suportadas pelas séries **Gemini Flash-Lite** — provam categoricamente que ferramentas comerciais viáveis podem ser inteiramente prototipadas sem barreiras financeiras. A eficácia analítica destes ecossistemas, portanto, alavancou-se exponencialmente na ciência fundamental da elaboração modular paramétrica de prompts corporativos (utilizando vertentes CO-STAR ou arquiteturas declarativas RISEN).1

A integração no back-end isolado pelo gerenciamento reativo e blindado com o emprego das Variáveis de Ambiente locais retidas em rotinas operacionais (Server Functions nativas com Vite Runtime) neutraliza exaustivamente vulnerabilidades arquiteturais que levariam inevitavelmente à exploração comercial dos acessos por entidades exógenas à aplicação.

#### **Referências citadas**

1.   
2. Gemini API Additional Terms of Service | Google AI for Developers, acessado em maio 2, 2026, [https://ai.google.dev/gemini-api/terms](https://ai.google.dev/gemini-api/terms)  
3. Gemini Developer API pricing, acessado em maio 2, 2026, [https://ai.google.dev/gemini-api/docs/pricing](https://ai.google.dev/gemini-api/docs/pricing)  
4. Rate limits | OpenAI API, acessado em maio 2, 2026, [https://developers.openai.com/api/docs/guides/rate-limits](https://developers.openai.com/api/docs/guides/rate-limits)  
5. Rate limits | OpenAI API \- OpenAI Developers, acessado em maio 2, 2026, [https://platform.openai.com/docs/guides/rate-limits/usage-tiers](https://platform.openai.com/docs/guides/rate-limits/usage-tiers)  
6. TanStack Start Overview | TanStack Start React Docs, acessado em maio 2, 2026, [https://tanstack.com/start/latest/docs/framework/react/overview](https://tanstack.com/start/latest/docs/framework/react/overview)  
7. TanStack Start Server Functions: How They Work and When You Still Need REST, acessado em maio 2, 2026, [https://jilles.me/tanstack-start-server-functions-how-they-work/](https://jilles.me/tanstack-start-server-functions-how-they-work/)  
8. Overview | TanStack AI Docs, acessado em maio 2, 2026, [https://tanstack.com/ai/latest/docs/getting-started/overview](https://tanstack.com/ai/latest/docs/getting-started/overview)  
9. Gemini API Key Free Limits 2026: What's Actually Free and Why Your Keys Share One Quota | LaoZhang AI Blog, acessado em maio 2, 2026, [https://blog.laozhang.ai/en/posts/gemini-api-free-tier](https://blog.laozhang.ai/en/posts/gemini-api-free-tier)  
10. Google Gemini API Free Tier 2026: Complete Limits Guide \+ 429 Error Solutions | YingTu, acessado em maio 2, 2026, [https://yingtu.ai/en/blog/google-gemini-api-free-tier](https://yingtu.ai/en/blog/google-gemini-api-free-tier)  
11. Gemini API | Google AI for Developers, acessado em maio 2, 2026, [https://ai.google.dev/gemini-api/docs](https://ai.google.dev/gemini-api/docs)  
12. Building with Gemini: Your First Node.js AI App with Native TypeScript \- LearnByDo.ing, acessado em maio 2, 2026, [https://www.learnbydo.ing/blog/geminisdk-node-typescript](https://www.learnbydo.ing/blog/geminisdk-node-typescript)