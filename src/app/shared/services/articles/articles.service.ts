import { Injectable } from '@angular/core';
import { ApiService } from "../api/api.service";
import { GlobalService } from "../global/global.service";

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  constructor(
    private api: ApiService,
    public glb: GlobalService
   ) { }

   /**
   * Busca artículos.
   * @returns Una promesa con la respuesta de la búsqueda de artículos.
   */
  async searchArticles(): Promise<any> {
    try {
      const url = this.buildSearchArticlesUrl();
      console.log('url:', url);
      return await this.api.sendRequest('GET', url);
    } catch (error) {
      console.error('Hubo un error al obtener los productos iniciales:', error);
      throw error;
    }
  }

  /**
   * Pre-busca artículos.
   * @param search - Término de búsqueda.
   * @returns Una promesa con la respuesta de la pre-búsqueda de artículos.
   */
  async preSearchArticles(search: string): Promise<any> {
    try {
      const url = `/articulos/presearch?search=${search}&pageNumber=1&order=masRelevante`;
      console.log('url:', url);
      return await this.api.sendRequest('GET', url);
    } catch (error) {
      console.error('Hubo un error al obtener los productos iniciales:', error);
      throw error;
    }
  }

  /**
   * Obtiene un artículo por ID.
   * @param id - ID del artículo.
   * @returns Una promesa con la respuesta del artículo.
   */
  async getArticle(id: number): Promise<any> {
    try {
      const url = `/articulos/articulo?id=${id}`;
      return await this.api.sendRequest('GET', url);
    } catch (error) {
      console.error('Hubo un error al obtener el producto:', error);
      throw error;
    }
  }

  async getDataBuyWompi(params: {id: number, cantidad: number}): Promise<any> {
    try {
      const url = `/payments/articulo/integrity-signature?id=${params.id}&cantidad=${params.cantidad}`;
      return await this.api.sendRequest('GET', url);
    } catch (error) {
      console.error('Hubo un error al realizar la compra:', error);
      throw error;
    }
  }

  /**
   * Construye la URL para la búsqueda de artículos.
   * @returns La URL construida.
   */
  private buildSearchArticlesUrl(): string {
    let url = `/articulos/search?search=${this.glb.searchArticles}&pageNumber=${this.glb.pageArticles}&order=${this.glb.orderArticles}&categories=${this.glb.categoriesSelectedString}`;
    if (this.glb.searchArticles === '') {
      url = `/articulos/search?pageNumber=${this.glb.pageArticles}&order=${this.glb.orderArticles}&categories=${this.glb.categoriesSelectedString}`;
    }
    return url;
  }

}
