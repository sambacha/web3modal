import { IAbstractConnectorOptions } from "../../helpers";	

export interface IOptions {	
  scope?: string[];	
}	

export interface IBackboneConnectorOptions extends IAbstractConnectorOptions {	
  id: string;	
  config?: IOptions;	
}	

const ConnectToBackbone = (	
  Backbone: any,	
  opts: IBackboneConnectorOptions	
) => {	
  return new Promise(async (resolve, reject) => {	
    if (opts && opts.id) {	
      try {	
        const id = opts.id;	
        const network = opts.network || "mainnet";	
        const config = opts.config;	
        const cabal = new Backbone(id, network, config);	
        const provider = await cabal.getProvider();	
        provider.cabal = cabal;	
        await provider.enable();	
        return resolve(provider);	
      } catch (error) {	
        return reject(new Error("Failed to login through Backbone Cabal"));	
      }	
    } else {	
      return reject(new Error("Missing Backbone Id"));	
    }	
  });	
};	

export default ConnectToBackbone;	
