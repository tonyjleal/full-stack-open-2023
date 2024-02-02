const Notification = ({ notification }) => {
    if (!notification|| !notification.message) {
      return null
    }
  
    const {type, message} = notification

    return (
      <div className={`notification ${type}`}>
        {message}
      </div>
    )
  }

export default Notification