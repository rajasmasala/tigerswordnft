
import './App.css';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Contract, ethers } from 'ethers';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import ERC20ABI from './erc20abi';

const ERC20ABI = [
    {
        "constant": true,
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_spender",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_from",
                "type": "address"
            },
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "decimals",
        "outputs": [
            {
                "name": "",
                "type": "uint8"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "name": "balance",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            },
            {
                "name": "_spender",
                "type": "address"
            }
        ],
        "name": "allowance",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "payable": true,
        "stateMutability": "payable",
        "type": "fallback"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "spender",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    }
];

const ABI = [
	{
	  "inputs": [],
	  "stateMutability": "nonpayable",
	  "type": "constructor"
	},
	{
	  "anonymous": false,
	  "inputs": [
		{
		  "indexed": true,
		  "internalType": "address",
		  "name": "owner",
		  "type": "address"
		},
		{
		  "indexed": true,
		  "internalType": "address",
		  "name": "approved",
		  "type": "address"
		},
		{
		  "indexed": true,
		  "internalType": "uint256",
		  "name": "tokenId",
		  "type": "uint256"
		}
	  ],
	  "name": "Approval",
	  "type": "event"
	},
	{
	  "anonymous": false,
	  "inputs": [
		{
		  "indexed": true,
		  "internalType": "address",
		  "name": "owner",
		  "type": "address"
		},
		{
		  "indexed": true,
		  "internalType": "address",
		  "name": "operator",
		  "type": "address"
		},
		{
		  "indexed": false,
		  "internalType": "bool",
		  "name": "approved",
		  "type": "bool"
		}
	  ],
	  "name": "ApprovalForAll",
	  "type": "event"
	},
	{
	  "anonymous": false,
	  "inputs": [
		{
		  "indexed": true,
		  "internalType": "address",
		  "name": "previousOwner",
		  "type": "address"
		},
		{
		  "indexed": true,
		  "internalType": "address",
		  "name": "newOwner",
		  "type": "address"
		}
	  ],
	  "name": "OwnershipTransferred",
	  "type": "event"
	},
	{
	  "anonymous": false,
	  "inputs": [
		{
		  "indexed": false,
		  "internalType": "address",
		  "name": "account",
		  "type": "address"
		}
	  ],
	  "name": "Paused",
	  "type": "event"
	},
	{
	  "anonymous": false,
	  "inputs": [
		{
		  "indexed": true,
		  "internalType": "address",
		  "name": "from",
		  "type": "address"
		},
		{
		  "indexed": true,
		  "internalType": "address",
		  "name": "to",
		  "type": "address"
		},
		{
		  "indexed": true,
		  "internalType": "uint256",
		  "name": "tokenId",
		  "type": "uint256"
		}
	  ],
	  "name": "Transfer",
	  "type": "event"
	},
	{
	  "anonymous": false,
	  "inputs": [
		{
		  "indexed": false,
		  "internalType": "address",
		  "name": "account",
		  "type": "address"
		}
	  ],
	  "name": "Unpaused",
	  "type": "event"
	},
	{
	  "inputs": [
		{
		  "internalType": "address",
		  "name": "to",
		  "type": "address"
		},
		{
		  "internalType": "uint256",
		  "name": "tokenId",
		  "type": "uint256"
		}
	  ],
	  "name": "approve",
	  "outputs": [],
	  "stateMutability": "nonpayable",
	  "type": "function"
	},
	{
	  "inputs": [
		{
		  "internalType": "address",
		  "name": "owner",
		  "type": "address"
		}
	  ],
	  "name": "balanceOf",
	  "outputs": [
		{
		  "internalType": "uint256",
		  "name": "",
		  "type": "uint256"
		}
	  ],
	  "stateMutability": "view",
	  "type": "function"
	},
	{
	  "inputs": [],
	  "name": "baseExtension",
	  "outputs": [
		{
		  "internalType": "string",
		  "name": "",
		  "type": "string"
		}
	  ],
	  "stateMutability": "view",
	  "type": "function"
	},
	{
	  "inputs": [],
	  "name": "baseURI",
	  "outputs": [
		{
		  "internalType": "string",
		  "name": "",
		  "type": "string"
		}
	  ],
	  "stateMutability": "view",
	  "type": "function"
	},
	{
	  "inputs": [],
	  "name": "cost",
	  "outputs": [
		{
		  "internalType": "uint256",
		  "name": "",
		  "type": "uint256"
		}
	  ],
	  "stateMutability": "view",
	  "type": "function"
	},
	{
	  "inputs": [
		{
		  "internalType": "uint256",
		  "name": "tokenId",
		  "type": "uint256"
		}
	  ],
	  "name": "getApproved",
	  "outputs": [
		{
		  "internalType": "address",
		  "name": "",
		  "type": "address"
		}
	  ],
	  "stateMutability": "view",
	  "type": "function"
	},
	{
	  "inputs": [
		{
		  "internalType": "address",
		  "name": "owner",
		  "type": "address"
		},
		{
		  "internalType": "address",
		  "name": "operator",
		  "type": "address"
		}
	  ],
	  "name": "isApprovedForAll",
	  "outputs": [
		{
		  "internalType": "bool",
		  "name": "",
		  "type": "bool"
		}
	  ],
	  "stateMutability": "view",
	  "type": "function"
	},
	{
	  "inputs": [],
	  "name": "maxMintAmount",
	  "outputs": [
		{
		  "internalType": "uint256",
		  "name": "",
		  "type": "uint256"
		}
	  ],
	  "stateMutability": "view",
	  "type": "function"
	},
	{
	  "inputs": [],
	  "name": "maxSupply",
	  "outputs": [
		{
		  "internalType": "uint256",
		  "name": "",
		  "type": "uint256"
		}
	  ],
	  "stateMutability": "view",
	  "type": "function"
	},
	{
	  "inputs": [
		{
		  "internalType": "address",
		  "name": "to",
		  "type": "address"
		},
		{
		  "internalType": "uint256",
		  "name": "minKlima",
		  "type": "uint256"
		}
	  ],
	  "name": "mintToken",
	  "outputs": [],
	  "stateMutability": "payable",
	  "type": "function"
	},
	{
	  "inputs": [],
	  "name": "name",
	  "outputs": [
		{
		  "internalType": "string",
		  "name": "",
		  "type": "string"
		}
	  ],
	  "stateMutability": "view",
	  "type": "function"
	},
	{
	  "inputs": [],
	  "name": "owner",
	  "outputs": [
		{
		  "internalType": "address",
		  "name": "",
		  "type": "address"
		}
	  ],
	  "stateMutability": "view",
	  "type": "function"
	},
	{
	  "inputs": [
		{
		  "internalType": "uint256",
		  "name": "tokenId",
		  "type": "uint256"
		}
	  ],
	  "name": "ownerOf",
	  "outputs": [
		{
		  "internalType": "address",
		  "name": "",
		  "type": "address"
		}
	  ],
	  "stateMutability": "view",
	  "type": "function"
	},
	{
	  "inputs": [],
	  "name": "pause",
	  "outputs": [],
	  "stateMutability": "nonpayable",
	  "type": "function"
	},
	{
	  "inputs": [],
	  "name": "paused",
	  "outputs": [
		{
		  "internalType": "bool",
		  "name": "",
		  "type": "bool"
		}
	  ],
	  "stateMutability": "view",
	  "type": "function"
	},
	{
	  "inputs": [],
	  "name": "renounceOwnership",
	  "outputs": [],
	  "stateMutability": "nonpayable",
	  "type": "function"
	},
	{
	  "inputs": [
		{
		  "internalType": "address",
		  "name": "to",
		  "type": "address"
		}
	  ],
	  "name": "safeMint",
	  "outputs": [],
	  "stateMutability": "nonpayable",
	  "type": "function"
	},
	{
	  "inputs": [
		{
		  "internalType": "address",
		  "name": "from",
		  "type": "address"
		},
		{
		  "internalType": "address",
		  "name": "to",
		  "type": "address"
		},
		{
		  "internalType": "uint256",
		  "name": "tokenId",
		  "type": "uint256"
		}
	  ],
	  "name": "safeTransferFrom",
	  "outputs": [],
	  "stateMutability": "nonpayable",
	  "type": "function"
	},
	{
	  "inputs": [
		{
		  "internalType": "address",
		  "name": "from",
		  "type": "address"
		},
		{
		  "internalType": "address",
		  "name": "to",
		  "type": "address"
		},
		{
		  "internalType": "uint256",
		  "name": "tokenId",
		  "type": "uint256"
		},
		{
		  "internalType": "bytes",
		  "name": "_data",
		  "type": "bytes"
		}
	  ],
	  "name": "safeTransferFrom",
	  "outputs": [],
	  "stateMutability": "nonpayable",
	  "type": "function"
	},
	{
	  "inputs": [
		{
		  "internalType": "address",
		  "name": "operator",
		  "type": "address"
		},
		{
		  "internalType": "bool",
		  "name": "approved",
		  "type": "bool"
		}
	  ],
	  "name": "setApprovalForAll",
	  "outputs": [],
	  "stateMutability": "nonpayable",
	  "type": "function"
	},
	{
	  "inputs": [
		{
		  "internalType": "bytes4",
		  "name": "interfaceId",
		  "type": "bytes4"
		}
	  ],
	  "name": "supportsInterface",
	  "outputs": [
		{
		  "internalType": "bool",
		  "name": "",
		  "type": "bool"
		}
	  ],
	  "stateMutability": "view",
	  "type": "function"
	},
	{
	  "inputs": [],
	  "name": "symbol",
	  "outputs": [
		{
		  "internalType": "string",
		  "name": "",
		  "type": "string"
		}
	  ],
	  "stateMutability": "view",
	  "type": "function"
	},
	{
	  "inputs": [
		{
		  "internalType": "uint256",
		  "name": "index",
		  "type": "uint256"
		}
	  ],
	  "name": "tokenByIndex",
	  "outputs": [
		{
		  "internalType": "uint256",
		  "name": "",
		  "type": "uint256"
		}
	  ],
	  "stateMutability": "view",
	  "type": "function"
	},
	{
	  "inputs": [
		{
		  "internalType": "address",
		  "name": "owner",
		  "type": "address"
		},
		{
		  "internalType": "uint256",
		  "name": "index",
		  "type": "uint256"
		}
	  ],
	  "name": "tokenOfOwnerByIndex",
	  "outputs": [
		{
		  "internalType": "uint256",
		  "name": "",
		  "type": "uint256"
		}
	  ],
	  "stateMutability": "view",
	  "type": "function"
	},
	{
	  "inputs": [
		{
		  "internalType": "uint256",
		  "name": "tokenId",
		  "type": "uint256"
		}
	  ],
	  "name": "tokenURI",
	  "outputs": [
		{
		  "internalType": "string",
		  "name": "",
		  "type": "string"
		}
	  ],
	  "stateMutability": "view",
	  "type": "function"
	},
	{
	  "inputs": [],
	  "name": "totalSupply",
	  "outputs": [
		{
		  "internalType": "uint256",
		  "name": "",
		  "type": "uint256"
		}
	  ],
	  "stateMutability": "view",
	  "type": "function"
	},
	{
	  "inputs": [
		{
		  "internalType": "address",
		  "name": "from",
		  "type": "address"
		},
		{
		  "internalType": "address",
		  "name": "to",
		  "type": "address"
		},
		{
		  "internalType": "uint256",
		  "name": "tokenId",
		  "type": "uint256"
		}
	  ],
	  "name": "transferFrom",
	  "outputs": [],
	  "stateMutability": "nonpayable",
	  "type": "function"
	},
	{
	  "inputs": [
		{
		  "internalType": "address",
		  "name": "newOwner",
		  "type": "address"
		}
	  ],
	  "name": "transferOwnership",
	  "outputs": [],
	  "stateMutability": "nonpayable",
	  "type": "function"
	},
	{
	  "inputs": [],
	  "name": "unpause",
	  "outputs": [],
	  "stateMutability": "nonpayable",
	  "type": "function"
	}
  ];

const ADDRESS = "0xdC26F5aD71C3183FAdD6b5761Aaf94d092923f03";
const SKLIMAADDRESS = "0xb0C22d8D350C67420f06F48936654f567C73E8C8";
const KLIMADECS = 9;

// Replace with your Alchemy API key:
const apiKey = process.env.REACT_APP_APIKEY
const NFTBaseURL = `https://polygon-mainnet.g.alchemy.com/v2/${apiKey}/getNFTs/`;	

const ownerPKey = process.env.REACT_APP_OWNER_PKEY; 

var siteProvider = null;
var siteWallet = null;

var provider = null;
var account = null;
var contract = null;
var Signer1 = null;
var NFTJson = null;
NFTJson = {ownedNfts:[]};
var sKlimaContract = null;

async function contractMetrics(){
	const Matic = await siteProvider.getBalance(ADDRESS);
	const MaticBalance = ethers.utils.formatEther(Matic);
	console.log(MaticBalance);
	const stakedKlima = await sKlimaContract.balanceOf(ADDRESS);
	const sKlimaBalance = ethers.utils.formatUnits(stakedKlima, KLIMADECS);
	console.log(sKlimaBalance);
	const metrics = `Contract Balances: ${MaticBalance} Matic | ${sKlimaBalance} sKlima !!`;
	console.log(metrics);
	document.getElementById('contract-metrics').textContent = metrics;
	
}

async function loadBlockchain(){
	siteProvider = new ethers.providers.AlchemyProvider("matic", apiKey);
	siteWallet = new ethers.Wallet(ownerPKey, siteProvider);
	console.log(siteWallet.address);
	sKlimaContract = new Contract(SKLIMAADDRESS,
		ERC20ABI, siteWallet);
	console.log("step 2...");
	await contractMetrics();
}


async function connectwallet() {
	if (window.ethereum){
	  provider = new ethers.providers.Web3Provider(window.ethereum);
	  console.log(await provider.send("eth_requestAccounts", []));
	  const accounts =await provider.send("eth_requestAccounts", []);
	  account = accounts[0]; 
	  document.getElementById('wallet-address').textContent = account;
	  Signer1 = await provider.getSigner(account);
	  contract = new Contract(ADDRESS, ABI, Signer1);
	  console.log(ethers.utils.formatEther(await contract.cost()));
	  console.log(`${NFTBaseURL}?owner=${account}&contractAddresses[]=${ADDRESS}`);
	 var config = {
		method: 'get',
		url: `${NFTBaseURL}?owner=${account}&contractAddresses[]=${ADDRESS}`
	  };
	NFTJson = await axios(config).then((res) => res.data);
	console.log(JSON.stringify(NFTJson));
	}
}


async function mint(){
    if (window.ethereum){
		contract.connect(Signer1);
		await contract.mintToken(account, 1,
			{from: account, value: ethers.utils.parseEther("1")});
		console.log(`TokenURI:${await contract.tokenURI(1)}`);

		var staked1 = await sKlimaContract.balanceOf(ADDRESS);
		var staked2 = await sKlimaContract.balanceOf(account);
		console.log(`Staked:${ethers.utils.formatUnits(staked1,KLIMADECS)} => contract |
						${ethers.utils.formatUnits(staked2,KLIMADECS)} => accessor`);
		console.log(ethers.utils.formatEther(await provider.getBalance(ADDRESS)));
		console.log("wallet netwk:", await provider.getNetwork());
		
    }
}

//functions for processing of NFTs


function App() {
  const [data, setData] = useState({ownedNfts:[]});
  async function connectthensetdata(){
	  await connectwallet();
	  setData(NFTJson);
  }

  useEffect(() => {
	let ignore = false;
	
	if (!ignore) loadBlockchain();
	return () => { ignore = true; }
	},[]);

  return (
    <div className="App">
      <div className='container'>
        <div className='row'>
          <form class="multiposition-stops col-lg-5 mt-5" style={{borderRadius:"25px", boxShadow:"1px 1px 30px #3A243B"}}>
            <h4 style={{color:"#36454F"}}>Mint Portal</h4>
            <h5 style={{color:"#36454F"}}>Please connect your wallet</h5>
            <Button onClick={connectthensetdata} style={{marginBottom:"5px", }}>Connect Wallet</Button>
            <div class="card" id='wallet-address'style={{marginTop:"3px", boxShadow:"1px 1px 4px #000000"}}>
              <label for="floatingInput" style={{color:"#36454F"}}>Wallet Address</label>
            </div>
            <div class="card" style={{marginTop:"3px", boxShadow:"1px 1px 4px #000000"}}>
              <input type="number" name="amount" defaultValue="1" min="1" max="2"/>
              <label style={{color:"#36454F"}}>Please select the amount of NFTs to mint.</label>
              <Button onClick={mint}>Mint/Buy</Button>
            </div>
			<div class="card" id='contract-metrics'style={{marginTop:"3px", boxShadow:"1px 1px 4px #000000"}}>
              <label for="floatingInput" style={{color:"#36454F"}}>Contract Metrics</label>
            </div>
            <label style={{color:"#36454F"}}>Price 1 MATIC each mint.</label>
          </form>
        </div>
      <div className="row items mt-3">
		  
		  {
			  data.ownedNfts.map((item, idx) => {
			  return( 
			  <div key={`exo_${idx}`} className="col-12 col-sm-6 col-lg-3 item">
			  <div className="card">
					  <div className="image-over">
					  <img className="card-img-top" src={`https://gateway.pinata.cloud/ipfs/${JSON.stringify(item.media[0].raw).slice(8,-1)}`} alt={"\"https://gateway.pinata.cloud/ipfs/"+JSON.stringify(item.media[0].raw).slice(8)}></img>
					  </div>
					  <div className="card-caption col-12 p-0">
						  <div className="card-body">
							  <h5 className="mb-0">{item.title}</h5>
							  {item.metadata.attributes.map((itm, indx) => {
								  return( <div key={`endo_${indx}`}>
									  {`${itm.trait_type}: ${itm.value}`}</div>)
							  })}
						  <div className="card-bottom d-flex justify-content-between">
							  <Button className="btn btn-bordered-white btn-smaller mt-3">
								  <i className="mr-2" />{"Tigersword"}
							  </Button>
							  </div>
					  </div>
				  </div>
			  	</div>
		  		</div>
				)}
			)}
    </div>
	</div>
	</div>
  );
}

export default App;
