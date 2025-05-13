<?php
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class BookingConfirmed extends Notification
{
    protected $booking;

    public function __construct($booking)
    {
        $this->booking = $booking;
    }

    public function via($notifiable)
    {
        return ['mail', 'database'];
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('Booking Confirmation')
            ->greeting('Hello ' . $notifiable->name)
            ->line('Your booking for the tour "' . $this->booking->tour->title . '" has been confirmed.')
            ->action('View Booking', url('/my-bookings'))
            ->line('We hope you enjoy your trip!');
    }

    public function toArray($notifiable)
    {
        return [
            'message' => 'Your booking for the tour "' . $this->booking->tour->title . '" has been confirmed.',
            'tour_id' => $this->booking->tour->id,
        ];
    }
}
