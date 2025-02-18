import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import * as CardDTO from './dto/create-card-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post('/board')
  create(
    @Body() createNotificationDto: CreateNotificationDto,
    @Req() req: any,
  ) {
    return this.notificationsService.create(
      createNotificationDto,
      req.user.uid,
    );
  }

  @Post('/card')
  createCardNotification(
    @Body() createNotificationDto: CardDTO.CreateNotificationDto,
    @Req() req: any,
  ) {
    return this.notificationsService.createCardNotification(
      createNotificationDto,
      req.user.uid,
    );
  }

  @Get(':userId/:limit/:offset')
  findAll(
    @Param('userId') userId: string,
    @Param('limit') limit: number,
    @Param('offset') offset: number,
  ) {
    return this.notificationsService.findAll(userId, limit, offset);
  }

  @Get('isNewNotification/:userId')
  isNewNotification(@Param('userId') userId: string) {
    return this.notificationsService.isNewNotification(userId);
  }

  @Delete('/board')
  isAcceptNotification(
    @Body()
    req: {
      userId: string;
      notificationId: string;
      isAccepted: boolean;
    },
  ) {
    return this.notificationsService.isAcceptNotification(
      req.notificationId,
      req.isAccepted,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notificationsService.remove(id);
  }
}
