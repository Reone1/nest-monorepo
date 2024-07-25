import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ItemService } from './item.service';

@Controller()
export class ItemController {
  constructor(private itemService: ItemService) {}

  @MessagePattern({ cmd: 'get_items' })
  getItems() {
    return this.itemService.getItems();
  }
}
