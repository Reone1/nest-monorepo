import { Injectable } from '@nestjs/common';

@Injectable()
export class ItemService {
  getItems() {
    return [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
    ];
  }
}
